
/**
 * Utilitaires pour la gestion des images
 */

export const getImageUrl = (url: string | null | undefined): string => {
  if (!url) {
    return '/placeholder.svg';
  }
  
  // Si l'URL est déjà complète, la retourner telle quelle
  if (url.startsWith('http')) {
    return url;
  }
  
  // Si c'est un chemin Supabase, construire l'URL complète
  if (url.startsWith('product-images/')) {
    return `https://knbzqvnlhfoumgyiqvch.supabase.co/storage/v1/object/public/${url}`;
  }
  
  return url;
};

export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  const baseUrl = getImageUrl(url);
  
  if (baseUrl === '/placeholder.svg') {
    return baseUrl;
  }
  
  // Si c'est une image Unsplash, ajouter les paramètres d'optimisation
  if (baseUrl.includes('unsplash.com')) {
    let optimizedUrl = baseUrl;
    if (width) optimizedUrl += `&w=${width}`;
    if (height) optimizedUrl += `&h=${height}`;
    optimizedUrl += '&fit=crop&auto=format';
    return optimizedUrl;
  }
  
  return baseUrl;
};

export const extractImageArrayFromString = (imageString: string | null): string[] => {
  if (!imageString) return [];
  
  try {
    // Si c'est déjà un tableau JSON
    if (imageString.startsWith('[')) {
      return JSON.parse(imageString);
    }
    
    // Si c'est une URL simple
    return [imageString];
  } catch {
    return imageString ? [imageString] : [];
  }
};

export const formatImageArrayForStorage = (images: string[]): string => {
  if (images.length === 0) return '';
  if (images.length === 1) return images[0];
  return JSON.stringify(images);
};

export const validateImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const getImageFileName = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.split('/').pop() || 'image';
  } catch {
    return 'image';
  }
};

export const generateThumbnailUrl = (url: string, size: number = 200): string => {
  const optimizedUrl = getOptimizedImageUrl(url, size, size);
  return optimizedUrl;
};
