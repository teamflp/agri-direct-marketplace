
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useAdvancedRateLimit } from '@/hooks/useAdvancedRateLimit';
import { validateEmail, sanitizeInput, logSecurityEvent } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Loader2, Shield, Lock, Eye, EyeOff } from 'lucide-react';

const EnhancedSecureLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState(0);
  
  const { signIn } = useAuth();
  const { toast } = useToast();
  
  // Rate limiting avancé avec backoff exponentiel
  const rateLimit = useAdvancedRateLimit('login', { 
    maxAttempts: 5, 
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 5 * 60 * 1000, // 5 minutes initial
    exponentialBackoff: true
  });

  // Log des tentatives de connexion
  const logLoginAttempt = async (success: boolean, failureReason?: string) => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      await supabase.from('login_attempts').insert({
        email: sanitizeInput(email),
        success,
        failure_reason: failureReason || null,
        ip_address: null, // Sera rempli côté serveur si disponible
        user_agent: navigator.userAgent
      });

      // Log dans l'audit de sécurité pour les échecs répétés
      if (!success && attemptCount >= 3) {
        await logSecurityEvent('repeated_login_failures', {
          email: sanitizeInput(email),
          attempt_count: attemptCount + 1
        });
      }
    } catch (error) {
      console.error('Failed to log login attempt:', error);
    }
  };

  const handleEmailChange = (value: string) => {
    const sanitized = sanitizeInput(value, { maxLength: 254 });
    setEmail(sanitized);
    
    if (sanitized) {
      const validation = validateEmail(sanitized);
      setEmailError(validation.error || '');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification du rate limiting
    if (rateLimit.isRateLimited) {
      toast({
        title: 'Trop de tentatives',
        description: `Veuillez attendre ${rateLimit.getRemainingTime} secondes avant de réessayer`,
        variant: 'destructive',
      });
      return;
    }

    // Validation des champs
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      toast({
        title: 'Email invalide',
        description: emailValidation.error,
        variant: 'destructive',
      });
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: 'Mot de passe requis',
        description: 'Veuillez saisir votre mot de passe',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        // Enregistrer l'échec
        rateLimit.recordAttempt(false);
        setAttemptCount(prev => prev + 1);
        
        await logLoginAttempt(false, error.message);
        
        // Messages d'erreur sécurisés (pas trop spécifiques)
        let userMessage = 'Email ou mot de passe incorrect';
        
        if (error.message.includes('Invalid login credentials')) {
          userMessage = 'Identifiants invalides';
        } else if (error.message.includes('Email not confirmed')) {
          userMessage = 'Veuillez confirmer votre email avant de vous connecter';
        } else if (error.message.includes('Too many requests')) {
          userMessage = 'Trop de tentatives. Veuillez réessayer plus tard';
        }
        
        toast({
          title: 'Erreur de connexion',
          description: userMessage,
          variant: 'destructive',
        });

        throw error;
      } else {
        // Succès
        rateLimit.recordAttempt(true);
        await logLoginAttempt(true);
        
        toast({
          title: 'Connexion réussie !',
          description: 'Bienvenue sur AgriMarket',
          variant: 'default',
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Alerte de sécurité pour tentatives multiples
  const showSecurityAlert = attemptCount >= 3 && !rateLimit.isRateLimited;

  return (
    <Card className="w-full max-w-md mx-auto border-t-4 border-t-agrimarket-orange">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-agrimarket-orange" />
          Connexion sécurisée
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rateLimit.isRateLimited && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Compte temporairement bloqué</strong>
              <br />
              Trop de tentatives de connexion. Réessayez dans {rateLimit.getRemainingTime} secondes.
            </AlertDescription>
          </Alert>
        )}

        {showSecurityAlert && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Plusieurs tentatives de connexion échouées détectées. Pour votre sécurité, vérifiez vos identifiants.
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={isLoading || rateLimit.isRateLimited}
              autoComplete="email"
              className={emailError ? 'border-red-500' : ''}
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading || rateLimit.isRateLimited}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading || rateLimit.isRateLimited}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown" 
            disabled={isLoading || rateLimit.isRateLimited || !!emailError}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>

          {attemptCount > 0 && (
            <div className="text-center text-sm text-gray-600">
              Tentatives: {attemptCount}/5
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedSecureLoginForm;
