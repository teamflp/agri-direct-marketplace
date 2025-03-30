
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ApiKeyState {
  isKeySet: boolean;
  isTesting: boolean;
  testResult: boolean | null;
  hasTested: boolean;
}

export function useSupabaseApiKey() {
  const [apiKeyState, setApiKeyState] = useState<ApiKeyState>({
    isKeySet: false,
    isTesting: false,
    testResult: null,
    hasTested: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    checkApiKeyStatus();
  }, []);

  const checkApiKeyStatus = async () => {
    try {
      // Vérifier si la clé est configurée en appelant la fonction Edge
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: {
          prompt: "Ceci est un test pour vérifier si la clé API est configurée.",
          type: "test"
        }
      });

      setApiKeyState(prev => ({
        ...prev,
        isKeySet: error === null,
        testResult: error === null,
        hasTested: true
      }));
    } catch (error) {
      console.error("Erreur lors de la vérification de la clé API:", error);
      setApiKeyState(prev => ({
        ...prev,
        isKeySet: false,
        testResult: false,
        hasTested: true
      }));
    }
  };

  const testApiKey = async () => {
    setApiKeyState(prev => ({ ...prev, isTesting: true }));
    try {
      const { data, error } = await supabase.functions.invoke('openai-suggestions', {
        body: {
          prompt: "Ceci est un test pour vérifier si la clé API est configurée.",
          type: "test"
        }
      });

      const success = error === null;
      setApiKeyState(prev => ({
        ...prev,
        isTesting: false,
        testResult: success,
        hasTested: true,
        isKeySet: success
      }));

      if (success) {
        toast({
          title: "Connexion réussie",
          description: "La clé API OpenAI est correctement configurée.",
          variant: "default",
        });
      } else {
        toast({
          title: "Échec de connexion",
          description: error?.message || "La clé API OpenAI n'est pas valide ou n'est pas configurée.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setApiKeyState(prev => ({
        ...prev,
        isTesting: false,
        testResult: false,
        hasTested: true,
        isKeySet: false
      }));
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors du test de la clé API.",
        variant: "destructive",
      });
    }
  };

  return {
    apiKeyState,
    testApiKey,
  };
}
