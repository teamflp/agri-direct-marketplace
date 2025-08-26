
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidationRequest {
  type: 'email' | 'phone' | 'name' | 'product' | 'order';
  data: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: ValidationRequest = await req.json();
    
    console.log(`Validating ${type}:`, data);

    let validationResult = { isValid: true, errors: [] as string[] };

    switch (type) {
      case 'email':
        validationResult = validateEmail(data.email);
        break;
      case 'phone':
        validationResult = validatePhoneNumber(data.phone);
        break;
      case 'name':
        validationResult = validateName(data.name, data.fieldName || 'nom');
        break;
      case 'product':
        validationResult = validateProduct(data);
        break;
      case 'order':
        validationResult = validateOrder(data);
        break;
      default:
        throw new Error(`Unknown validation type: ${type}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        ...validationResult
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Validation error:', error);
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

function validateEmail(email: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('L\'email est requis');
    return { isValid: false, errors };
  }
  
  if (email.length > 254) {
    errors.push('L\'email est trop long (max 254 caractères)');
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Format d\'email invalide');
  }
  
  return { isValid: errors.length === 0, errors };
}

function validatePhoneNumber(phone: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Le numéro de téléphone est requis');
    return { isValid: false, errors };
  }
  
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$|^\+[1-9]\d{1,14}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    errors.push('Format de numéro de téléphone invalide');
  }
  
  return { isValid: errors.length === 0, errors };
}

function validateName(name: string, fieldName: string = 'nom'): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!name || name.trim().length === 0) {
    errors.push(`Le ${fieldName} est requis`);
    return { isValid: false, errors };
  }
  
  if (name.length < 2) {
    errors.push(`Le ${fieldName} doit contenir au moins 2 caractères`);
  }
  
  if (name.length > 50) {
    errors.push(`Le ${fieldName} ne peut pas dépasser 50 caractères`);
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(name)) {
    errors.push(`Le ${fieldName} ne peut contenir que des lettres, espaces, tirets et apostrophes`);
  }
  
  return { isValid: errors.length === 0, errors };
}

function validateProduct(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Le nom du produit est requis');
  } else if (data.name.length > 100) {
    errors.push('Le nom du produit ne peut pas dépasser 100 caractères');
  }
  
  if (!data.price || data.price <= 0) {
    errors.push('Le prix doit être supérieur à 0');
  } else if (data.price > 999999.99) {
    errors.push('Le prix ne peut pas dépasser 999 999,99 €');
  }
  
  if (!data.category || data.category.trim().length === 0) {
    errors.push('La catégorie est requise');
  }
  
  if (data.description && data.description.length > 1000) {
    errors.push('La description ne peut pas dépasser 1000 caractères');
  }
  
  if (!data.stock || data.stock < 0) {
    errors.push('Le stock doit être supérieur ou égal à 0');
  }
  
  return { isValid: errors.length === 0, errors };
}

function validateOrder(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push('La commande doit contenir au moins un article');
  }
  
  if (!data.delivery_address || data.delivery_address.trim().length === 0) {
    errors.push('L\'adresse de livraison est requise');
  }
  
  if (!data.phone_number) {
    const phoneValidation = validatePhoneNumber(data.phone_number);
    if (!phoneValidation.isValid) {
      errors.push(...phoneValidation.errors);
    }
  }
  
  if (data.total_price <= 0) {
    errors.push('Le montant total doit être supérieur à 0');
  }
  
  return { isValid: errors.length === 0, errors };
}
