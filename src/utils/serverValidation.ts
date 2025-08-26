
import { supabase } from '@/integrations/supabase/client';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface PasswordValidationResult extends ValidationResult {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
  isCompromised: boolean;
}

export const validateUserInputServer = async (
  type: 'email' | 'phone' | 'name' | 'product' | 'order',
  data: Record<string, any>
): Promise<ValidationResult> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('validate-user-input', {
      body: { type, data }
    });

    if (error) {
      console.error('Server validation error:', error);
      return { isValid: false, errors: ['Erreur de validation serveur'] };
    }

    return {
      isValid: result.isValid,
      errors: result.errors || []
    };
  } catch (error) {
    console.error('Server validation failed:', error);
    return { isValid: false, errors: ['Erreur de connexion au serveur'] };
  }
};

export const validatePasswordStrengthServer = async (password: string): Promise<PasswordValidationResult> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('validate-password-strength', {
      body: { password }
    });

    if (error) {
      console.error('Password validation error:', error);
      return {
        isValid: false,
        errors: ['Erreur de validation serveur'],
        strength: 'weak',
        score: 0,
        isCompromised: false
      };
    }

    return {
      isValid: result.isValid,
      errors: result.errors || [],
      strength: result.strength,
      score: result.score,
      isCompromised: result.isCompromised
    };
  } catch (error) {
    console.error('Password validation failed:', error);
    return {
      isValid: false,
      errors: ['Erreur de connexion au serveur'],
      strength: 'weak',
      score: 0,
      isCompromised: false
    };
  }
};

export const validateEmailServer = async (email: string): Promise<ValidationResult> => {
  return validateUserInputServer('email', { email });
};

export const validatePhoneServer = async (phone: string): Promise<ValidationResult> => {
  return validateUserInputServer('phone', { phone });
};

export const validateNameServer = async (name: string, fieldName?: string): Promise<ValidationResult> => {
  return validateUserInputServer('name', { name, fieldName });
};

export const validateProductServer = async (productData: any): Promise<ValidationResult> => {
  return validateUserInputServer('product', productData);
};

export const validateOrderServer = async (orderData: any): Promise<ValidationResult> => {
  return validateUserInputServer('order', orderData);
};
