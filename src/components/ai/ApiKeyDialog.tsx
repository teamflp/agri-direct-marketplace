
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOpenAIKey } from "@/hooks/use-openai-key";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, KeyRound, Settings } from 'lucide-react';

interface ApiKeyDialogProps {
  trigger?: React.ReactNode;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ trigger }) => {
  const { apiKey, isKeySet, saveApiKey, clearApiKey } = useOpenAIKey();
  const [inputKey, setInputKey] = useState('');
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (inputKey.trim()) {
      saveApiKey(inputKey.trim());
      setInputKey('');
      setOpen(false);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setInputKey('');
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Settings className="h-4 w-4" />
      <span>Config IA</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuration de l'API OpenAI</DialogTitle>
          <DialogDescription>
            Entrez votre clé API OpenAI pour activer les fonctionnalités d'IA
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {isKeySet && (
            <Alert className="bg-green-50 border-green-200">
              <KeyRound className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Clé API configurée</AlertTitle>
              <AlertDescription className="text-green-700">
                Votre clé API est actuellement configurée et stockée localement.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="api-key">Clé API OpenAI</Label>
            <Input 
              id="api-key" 
              type="password"
              placeholder={isKeySet ? "••••••••••••••••••••••••••" : "sk-..."}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Votre clé API sera stockée uniquement dans votre navigateur local et ne sera jamais envoyée à nos serveurs.
            </p>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Ne partagez jamais votre clé API avec d'autres personnes. Pour une solution plus sécurisée, nous recommandons d'intégrer Supabase.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {isKeySet && (
            <Button variant="destructive" onClick={handleClear}>
              Effacer la clé
            </Button>
          )}
          <Button type="submit" onClick={handleSave}>
            {isKeySet ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
