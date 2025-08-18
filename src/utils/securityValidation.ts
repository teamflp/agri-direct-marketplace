
import DOMPurify from 'dompurify';

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
}

export const validateStrongPassword = (password: string): PasswordValidationResult => {
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

  let strength: PasswordValidationResult['strength'] = 'weak';
  if (score >= 7) strength = 'very-strong';
  else if (score >= 5) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0 && score >= 4,
    errors,
    strength,
    score
  };
};

export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
} = {}): string => {
  const { allowHtml = false, maxLength = 1000 } = options;
  
  let sanitized = input.trim();
  
  // Limitation de longueur
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  if (allowHtml) {
    // Sanitisation HTML permissive pour le contenu riche
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: []
    });
  } else {
    // Suppression complète du HTML
    sanitized = DOMPurify.sanitize(sanitized, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }
  
  return sanitized;
};

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'L\'email est trop long' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }
  
  return { isValid: true };
};

export const validatePhoneNumber = (phone: string): { isValid: boolean; error?: string } => {
  // Format français et international
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$|^\+[1-9]\d{1,14}$/;
  
  if (!phone) {
    return { isValid: false, error: 'Le numéro de téléphone est requis' };
  }
  
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Format de numéro de téléphone invalide' };
  }
  
  return { isValid: true };
};

export const validateName = (name: string, fieldName: string = 'nom'): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `Le ${fieldName} est requis` };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: `Le ${fieldName} doit contenir au moins 2 caractères` };
  }
  
  if (name.length > 50) {
    return { isValid: false, error: `Le ${fieldName} ne peut pas dépasser 50 caractères` };
  }
  
  // Permet les lettres (y compris accentuées), espaces, tirets et apostrophes
  if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(name)) {
    return { isValid: false, error: `Le ${fieldName} ne peut contenir que des lettres, espaces, tirets et apostrophes` };
  }
  
  return { isValid: true };
};

// Liste de mots de passe compromis couramment utilisés
const COMMON_PASSWORDS = [
  'password', '123456', '123456789', 'qwerty', 'azerty', 'password123',
  'admin', 'login', 'root', 'toor', 'pass', 'test', 'guest', 'user',
  'welcome', 'hello', 'football', 'baseball', 'dragon', 'monkey',
  'letmein', 'trustno1', 'shadow', 'master', 'jennifer', 'jordan'
];

export const checkCompromisedPassword = (password: string): boolean => {
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORDS.includes(lowerPassword);
};

export const logSecurityEvent = async (eventType: string, details: Record<string, any> = {}) => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    await supabase.from('security_audit_log').insert({
      event_type: eventType,
      table_name: details.tableName || null,
      record_id: details.recordId || null,
      old_values: details.oldValues || null,
      new_values: details.newValues || null
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};
