
import { useState, useEffect } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
  exponentialBackoff?: boolean;
}

interface AttemptData {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  blocked: boolean;
  blockUntil?: number;
}

export const useAdvancedRateLimit = (key: string, config: RateLimitConfig) => {
  const [attempts, setAttempts] = useState<Record<string, AttemptData>>({});
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const {
    maxAttempts,
    windowMs,
    blockDurationMs = 15 * 60 * 1000, // 15 minutes par défaut
    exponentialBackoff = true
  } = config;

  const checkRateLimit = (now: number = Date.now()): boolean => {
    const attemptData = attempts[key];
    
    if (!attemptData) return false;

    // Vérifier si toujours bloqué
    if (attemptData.blocked && attemptData.blockUntil && now < attemptData.blockUntil) {
      return true;
    }

    // Réinitialiser si la fenêtre a expiré
    if (now - attemptData.firstAttempt > windowMs) {
      const newAttempts = { ...attempts };
      delete newAttempts[key];
      setAttempts(newAttempts);
      return false;
    }

    return attemptData.count >= maxAttempts;
  };

  const recordAttempt = (success: boolean = false): void => {
    const now = Date.now();
    const currentAttempt = attempts[key];

    if (!currentAttempt || now - currentAttempt.firstAttempt > windowMs) {
      // Nouvelle fenêtre ou première tentative
      setAttempts(prev => ({
        ...prev,
        [key]: {
          count: 1,
          firstAttempt: now,
          lastAttempt: now,
          blocked: false
        }
      }));
    } else {
      // Incrémenter dans la fenêtre existante
      const newCount = currentAttempt.count + 1;
      let blocked = false;
      let blockUntil: number | undefined;

      if (!success && newCount >= maxAttempts) {
        blocked = true;
        let duration = blockDurationMs;
        
        // Backoff exponentiel basé sur le nombre de blocages précédents
        if (exponentialBackoff) {
          const previousBlocks = Math.floor(newCount / maxAttempts) - 1;
          duration = blockDurationMs * Math.pow(2, Math.min(previousBlocks, 5)); // Max 32x
        }
        
        blockUntil = now + duration;
      }

      setAttempts(prev => ({
        ...prev,
        [key]: {
          ...currentAttempt,
          count: newCount,
          lastAttempt: now,
          blocked,
          blockUntil
        }
      }));
    }

    // Log des tentatives suspectes
    if (!success && currentAttempt && currentAttempt.count >= maxAttempts - 1) {
      logSuspiciousActivity(key, currentAttempt.count + 1);
    }
  };

  const getRemainingTime = (): number => {
    const attemptData = attempts[key];
    if (!attemptData?.blocked || !attemptData.blockUntil) return 0;
    
    const remaining = attemptData.blockUntil - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  };

  const logSuspiciousActivity = async (identifier: string, attemptCount: number) => {
    try {
      const { logSecurityEvent } = await import('@/utils/securityValidation');
      await logSecurityEvent('suspicious_login_attempts', {
        identifier,
        attempt_count: attemptCount,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log suspicious activity:', error);
    }
  };

  // Mise à jour du timer
  useEffect(() => {
    const interval = setInterval(() => {
      const blocked = checkRateLimit();
      const remaining = getRemainingTime();
      
      setIsBlocked(blocked);
      setRemainingTime(remaining);
      
      // Nettoyer les tentatives expirées
      if (remaining === 0 && blocked) {
        const newAttempts = { ...attempts };
        if (newAttempts[key]) {
          newAttempts[key] = {
            ...newAttempts[key],
            blocked: false,
            blockUntil: undefined
          };
        }
        setAttempts(newAttempts);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [attempts, key, windowMs, blockDurationMs]);

  return {
    isRateLimited: checkRateLimit(),
    isBlocked,
    recordAttempt,
    getRemainingTime: getRemainingTime(),
    remainingTime,
    resetRateLimit: () => {
      const newAttempts = { ...attempts };
      delete newAttempts[key];
      setAttempts(newAttempts);
    }
  };
};
