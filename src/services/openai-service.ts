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

interface RecipeWithIngredients {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  nutritionalInfo: string;
  preparationTime: string;
}

interface GardeningAdvice {
  title: string;
  content: string;
  difficulty: string;
  season: string;
  tools: string[];
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
      console.log("Envoi de la requête pour des suggestions de produits");
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
      
      console.log("Réponse reçue:", data);
      
      if (data && data.content) {
        console.log("Contenu reçu:", data.content);
        try {
          const parsedContent = JSON.parse(data.content);
          console.log("Contenu parsé:", parsedContent);
          return parsedContent.suggestions || [];
        } catch (parseError) {
          console.error("Erreur lors du parsing JSON:", parseError);
          console.log("Données brutes:", data.content);
          throw new Error("Format de réponse invalide");
        }
      }
      
      return [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des suggestions de produits:", error);
      throw error;
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

  async getSeasonalRecipes(
    ingredients: string[],
    dietaryPreferences: string[]
  ): Promise<RecipeWithIngredients[]> {
    const prompt = `
      Je souhaite des recettes saisonnières utilisant ces ingrédients: ${ingredients.join(", ")}.
      Préférences alimentaires: ${dietaryPreferences.join(", ")}.
      Proposez 2 recettes détaillées incluant titre, description, liste d'ingrédients, étapes de préparation, information nutritionnelle et temps de préparation.
      Répondez au format JSON exact comme ceci:
      {
        "recipes": [
          {
            "title": "Titre de la recette",
            "description": "Description courte",
            "ingredients": ["Ingrédient 1", "Ingrédient 2"],
            "steps": ["Étape 1", "Étape 2"],
            "nutritionalInfo": "Information nutritionnelle",
            "preparationTime": "Temps de préparation"
          }
        ]
      }
    `;

    try {
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: { 
          prompt,
          model: 'gpt-4o',
          type: "seasonalRecipes"
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'appel à la fonction OpenAI:", error);
        throw new Error(error.message);
      }
      
      if (data && data.content) {
        const parsedContent = JSON.parse(data.content);
        return parsedContent.recipes || [];
      }
      
      return [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des recettes:", error);
      return [];
    }
  }

  async getGardeningAdvice(
    plantTypes: string[],
    gardenLocation: string,
    gardenSize: string,
    experience: string
  ): Promise<GardeningAdvice[]> {
    const prompt = `
      Je cherche des conseils de jardinage pour cultiver: ${plantTypes.join(", ")}.
      Mon jardin est situé à: ${gardenLocation}.
      La taille de mon jardin est: ${gardenSize}.
      Mon niveau d'expérience est: ${experience}.
      Donnez-moi 3 conseils de jardinage détaillés appropriés.
      Répondez au format JSON exact comme ceci:
      {
        "advice": [
          {
            "title": "Titre du conseil",
            "content": "Contenu détaillé",
            "difficulty": "Niveau de difficulté",
            "season": "Saison recommandée",
            "tools": ["Outil 1", "Outil 2"]
          }
        ]
      }
    `;

    try {
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: { 
          prompt,
          type: "gardeningAdvice"
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'appel à la fonction OpenAI:", error);
        throw new Error(error.message);
      }
      
      if (data && data.content) {
        const parsedContent = JSON.parse(data.content);
        return parsedContent.advice || [];
      }
      
      return [];
    } catch (error) {
      console.error("Erreur lors de l'obtention des conseils de jardinage:", error);
      return [];
    }
  }
}

export const openAIService = new OpenAIService();
