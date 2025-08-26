
import { useState, useEffect, useCallback } from 'react';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
  exponentialBackoff?: boolean;
}

interface RateLimitState {
  attempts: number;
  firstAttempt: number;
  blockedUntil?: number;
  currentBlockDuration: number;
}

export const useAdvancedRateLimit = (key: string, options: RateLimitOptions) => {
  const {
    maxAttempts,
    windowMs,
    blockDurationMs = 5 * 60 * 1000, // 5 minutes par défaut
    exponentialBackoff = false
  } = options;

  const [state, setState] = useState<RateLimitState>(() => {
    try {
      const stored = localStorage.getItem(`rateLimit_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          attempts: parsed.attempts || 0,
          firstAttempt: parsed.firstAttempt || Date.now(),
          blockedUntil: parsed.blockedUntil,
          currentBlockDuration: parsed.currentBlockDuration || blockDurationMs
        };
      }
    } catch (error) {
      console.error('Error loading rate limit state:', error);
    }
    
    return {
      attempts: 0,
      firstAttempt: Date.now(),
      currentBlockDuration: blockDurationMs
    };
  });

  // Sauvegarder l'état dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`rateLimit_${key}`, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving rate limit state:', error);
    }
  }, [key, state]);

  // Nettoyer l'état expiré
  useEffect(() => {
    const now = Date.now();
    
    // Si la fenêtre de temps est expirée, réinitialiser
    if (now - state.firstAttempt > windowMs) {
      setState(prev => ({
        attempts: 0,
        firstAttempt: now,
        currentBlockDuration: blockDurationMs
      }));
    }
    
    // Si le blocage est expiré, débloquer
    if (state.blockedUntil && now > state.blockedUntil) {
      setState(prev => ({
        ...prev,
        blockedUntil: undefined
      }));
    }
  }, [windowMs, blockDurationMs, state.firstAttempt, state.blockedUntil]);

  const isRateLimited = useCallback(() => {
    const now = Date.now();
    
    // Vérifier si actuellement bloqué
    if (state.blockedUntil && now < state.blockedUntil) {
      return true;
    }
    
    // Vérifier si le nombre max de tentatives est atteint
    return state.attempts >= maxAttempts;
  }, [state.attempts, state.blockedUntil, maxAttempts]);

  const getRemainingTime = useCallback(() => {
    if (!state.blockedUntil) return 0;
    
    const remaining = Math.max(0, Math.ceil((state.blockedUntil - Date.now()) / 1000));
    return remaining;
  }, [state.blockedUntil]);

  const recordAttempt = useCallback((success: boolean = false) => {
    const now = Date.now();
    
    setState(prev => {
      // Si succès, réinitialiser complètement
      if (success) {
        return {
          attempts: 0,
          firstAttempt: now,
          currentBlockDuration: blockDurationMs
        };
      }
      
      const newAttempts = prev.attempts + 1;
      let newBlockedUntil = prev.blockedUntil;
      let newBlockDuration = prev.currentBlockDuration;
      
      // Si on atteint le max, bloquer
      if (newAttempts >= maxAttempts) {
        newBlockedUntil = now + newBlockDuration;
        
        // Backoff exponentiel si activé
        if (exponentialBackoff) {
          newBlockDuration = Math.min(newBlockDuration * 2, 24 * 60 * 60 * 1000); // Max 24h
        }
      }
      
      return {
        attempts: newAttempts,
        firstAttempt: prev.firstAttempt,
        blockedUntil: newBlockedUntil,
        currentBlockDuration: newBlockDuration
      };
    });
  }, [maxAttempts, blockDurationMs, exponentialBackoff]);

  const reset = useCallback(() => {
    setState({
      attempts: 0,
      firstAttempt: Date.now(),
      currentBlockDuration: blockDurationMs
    });
  }, [blockDurationMs]);

  return {
    isRateLimited: isRateLimited(),
    getRemainingTime: getRemainingTime(),
    recordAttempt,
    reset,
    attemptCount: state.attempts,
    maxAttempts
  };
};
