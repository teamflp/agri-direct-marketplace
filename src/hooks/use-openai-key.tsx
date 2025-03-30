
import { useState, useEffect } from 'react';

export function useOpenAIKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeySet, setIsKeySet] = useState<boolean>(false);

  // Lors du chargement, vérifier si une clé existe déjà
  useEffect(() => {
    const storedKey = localStorage.getItem('openai-api-key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeySet(true);
    }
  }, []);

  // Fonction pour définir la clé API
  const saveApiKey = (key: string) => {
    localStorage.setItem('openai-api-key', key);
    setApiKey(key);
    setIsKeySet(true);
  };

  // Fonction pour effacer la clé API
  const clearApiKey = () => {
    localStorage.removeItem('openai-api-key');
    setApiKey('');
    setIsKeySet(false);
  };

  return {
    apiKey,
    isKeySet,
    saveApiKey,
    clearApiKey
  };
}
