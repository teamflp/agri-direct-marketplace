
import { Json } from '@/integrations/supabase/types';

// Utilitaires pour convertir les types Json de Supabase
export const parseJsonField = <T>(field: Json | null): T => {
  if (field === null) return {} as T;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T;
    } catch {
      return {} as T;
    }
  }
  return field as T;
};

export const parseJsonArray = (field: Json | null): string[] => {
  if (field === null) return [];
  if (Array.isArray(field)) {
    return field.filter((item): item is string => typeof item === 'string');
  }
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
      return [];
    }
  }
  return [];
};
