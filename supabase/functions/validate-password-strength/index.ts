
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
  isCompromised: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    
    console.log('Validating password strength');
    
    const validation = validateStrongPassword(password);
    const isCompromised = checkCompromisedPassword(password);
    
    const result: PasswordValidationResult = {
      ...validation,
      isCompromised
    };

    return new Response(
      JSON.stringify({
        success: true,
        ...result
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Password validation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

function validateStrongPassword(password: string): { isValid: boolean; errors: string[]; strength: 'weak' | 'medium' | 'strong' | 'very-strong'; score: number } {
  const errors: string[] = [];
  let score = 0;

  // Longueur minimum
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Majuscules
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  } else {
    score += 1;
  }

  // Minuscules
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  } else {
    score += 1;
  }

  // Chiffres
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  } else {
    score += 1;
  }

  // Caractères spéciaux
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)');
  } else {
    score += 1;
  }

  // Vérifications avancées
  if (password.length >= 16) {
    score += 1;
  }

  // Détection de patterns communs
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /azerty/i,
    /admin/i,
    /login/i
  ];

  const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));
  if (hasCommonPattern) {
    errors.push('Le mot de passe contient des motifs trop courants');
    score -= 2;
  }

  // Détection de caractères répétés
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Le mot de passe ne doit pas contenir plus de 2 caractères identiques consécutifs');
    score -= 1;
  }

  score = Math.max(0, score);

  let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak';
  if (score >= 7) strength = 'very-strong';
  else if (score >= 5) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0 && score >= 4,
    errors,
    strength,
    score
  };
}

function checkCompromisedPassword(password: string): boolean {
  // Liste de mots de passe compromis couramment utilisés
  const COMMON_PASSWORDS = [
    'password', '123456', '123456789', 'qwerty', 'azerty', 'password123',
    'admin', 'login', 'root', 'toor', 'pass', 'test', 'guest', 'user',
    'welcome', 'hello', 'football', 'baseball', 'dragon', 'monkey',
    'letmein', 'trustno1', 'shadow', 'master', 'jennifer', 'jordan'
  ];
  
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORDS.includes(lowerPassword);
}
