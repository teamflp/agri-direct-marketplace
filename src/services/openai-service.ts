
import { supabase } from "@/integrations/supabase/client";

interface ProductSuggestion {
  name: string;
  description: string;
  benefits: string[];
  price?: number;
  category: string;
}

interface FarmingTip {
  title: string;
  content: string;
  category: string;
}

class OpenAIService {
  async getProductSuggestions(
    userPreferences: string[], 
    season: string
  ): Promise<ProductSuggestion[]> {
    const prompt = `
      Je recherche des suggestions de produits bio pour un consommateur avec les préférences suivantes: ${userPreferences.join(", ")}.
      Nous sommes actuellement en saison: ${season}.
      Suggérez 3 produits bio appropriés, incluant nom, description courte, principaux bienfaits, et catégorie.
      Répondez au format JSON exact comme ceci:
      {
        "suggestions": [
          {
            "name": "Nom du produit",
            "description": "Description courte",
            "benefits": ["Bienfait 1", "Bienfait 2"],
            "category": "Catégorie"
          }
        ]
      }
    `;

    try {
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: { 
          prompt,
          type: "productSuggestions"
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'appel à la fonction OpenAI:", error);
        throw new Error(error.message);
      }
      
      if (data && data.content) {
        const parsedContent = JSON.parse(data.content);
        return parsedContent.suggestions || [];
      }
      
      return [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des suggestions de produits:", error);
      return [];
    }
  }

  async getFarmingTips(
    cropTypes: string[], 
    farmLocation: string,
    season: string
  ): Promise<FarmingTip[]> {
    const prompt = `
      Je suis un agriculteur cultivant: ${cropTypes.join(", ")}.
      Ma ferme est située à: ${farmLocation}.
      Nous sommes actuellement en saison: ${season}.
      Donnez-moi 3 conseils agricoles spécifiques pour améliorer ma production biologique.
      Répondez au format JSON exact comme ceci:
      {
        "tips": [
          {
            "title": "Titre du conseil",
            "content": "Contenu détaillé du conseil",
            "category": "Catégorie (ex: Irrigation, Pest Control, Soil Health)"
          }
        ]
      }
    `;

    try {
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: { 
          prompt,
          type: "farmingTips"
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'appel à la fonction OpenAI:", error);
        throw new Error(error.message);
      }
      
      if (data && data.content) {
        const parsedContent = JSON.parse(data.content);
        return parsedContent.tips || [];
      }
      
      return [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des conseils agricoles:", error);
      return [];
    }
  }
}

export const openAIService = new OpenAIService();
