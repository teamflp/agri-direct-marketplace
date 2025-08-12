
import { useState } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

interface AttemptData {
  count: number;
  firstAttempt: number;
}

export const useRateLimit = (key: string, config: RateLimitConfig) => {
  const [attempts, setAttempts] = useState<Record<string, AttemptData>>({});

  const isRateLimited = (): boolean => {
    const now = Date.now();
    const attemptData = attempts[key];

    if (!attemptData) return false;

    // Reset if window has passed
    if (now - attemptData.firstAttempt > config.windowMs) {
      const newAttempts = { ...attempts };
      delete newAttempts[key];
      setAttempts(newAttempts);
      return false;
    }

    return attemptData.count >= config.maxAttempts;
  };

  const recordAttempt = (): void => {
    const now = Date.now();
    const currentAttempt = attempts[key];

    if (!currentAttempt || now - currentAttempt.firstAttempt > config.windowMs) {
      setAttempts(prev => ({
        ...prev,
        [key]: { count: 1, firstAttempt: now }
      }));
    } else {
      setAttempts(prev => ({
        ...prev,
        [key]: { ...currentAttempt, count: currentAttempt.count + 1 }
      }));
    }
  };

  const getRemainingTime = (): number => {
    const attemptData = attempts[key];
    if (!attemptData) return 0;
    
    const elapsed = Date.now() - attemptData.firstAttempt;
    const remaining = config.windowMs - elapsed;
    return Math.max(0, Math.ceil(remaining / 1000));
  };

  return {
    isRateLimited: isRateLimited(),
    recordAttempt,
    getRemainingTime: getRemainingTime(),
  };
};
