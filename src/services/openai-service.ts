
import { useOpenAIKey } from "@/hooks/use-openai-key";

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
  private async getApiKey(): Promise<string> {
    // Cette méthode est appelée côté client, on peut utiliser localStorage
    return localStorage.getItem('openai-api-key') || '';
  }

  private async callOpenAI(prompt: string, options: any = {}): Promise<any> {
    const apiKey = await this.getApiKey();
    
    if (!apiKey) {
      throw new Error("Clé API OpenAI non configurée");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Vous êtes un expert en agriculture biologique et en alimentation durable."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          ...options,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 500
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Erreur lors de l'appel à l'API OpenAI");
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(`Erreur OpenAI: ${error.message}`);
    }
  }

  async getProductSuggestions(
    userPreferences: string[], 
    season: string
  ): Promise<ProductSuggestion[]> {
    const prompt = `
      Je recherche des suggestions de produits bio pour un consommateur avec les préférences suivantes: ${userPreferences.join(", ")}.
      Nous sommes actuellement en saison: ${season}.
      Suggérez 3 produits bio appropriés, incluant nom, description courte, principaux bienfaits, et catégorie.
      Répondez au format JSON exact comme ceci:
      [
        {
          "name": "Nom du produit",
          "description": "Description courte",
          "benefits": ["Bienfait 1", "Bienfait 2"],
          "category": "Catégorie"
        }
      ]
    `;

    try {
      const result = await this.callOpenAI(prompt, { 
        temperature: 0.7,
        response_format: { type: "json_object" }
      });
      
      const content = result.choices[0]?.message?.content || "{}";
      const parsedContent = JSON.parse(content);
      
      return parsedContent.suggestions || [];
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
      [
        {
          "title": "Titre du conseil",
          "content": "Contenu détaillé du conseil",
          "category": "Catégorie (ex: Irrigation, Pest Control, Soil Health)"
        }
      ]
    `;

    try {
      const result = await this.callOpenAI(prompt, { 
        temperature: 0.7,
        response_format: { type: "json_object" }
      });
      
      const content = result.choices[0]?.message?.content || "{}";
      const parsedContent = JSON.parse(content);
      
      return parsedContent.tips || [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des conseils agricoles:", error);
      return [];
    }
  }
}

export const openAIService = new OpenAIService();
