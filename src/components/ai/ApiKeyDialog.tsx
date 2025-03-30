
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, KeyRound, Settings, Loader2 } from 'lucide-react';
import { useSupabaseApiKey } from "@/hooks/use-supabase-api-key";

interface ApiKeyDialogProps {
  trigger?: React.ReactNode;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ trigger }) => {
  const { apiKeyState, testApiKey } = useSupabaseApiKey();
  const [open, setOpen] = useState(false);

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
            Statut de la configuration de l'API OpenAI pour les fonctionnalités d'IA
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {apiKeyState.isKeySet && (
            <Alert className="bg-green-50 border-green-200">
              <KeyRound className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Clé API configurée</AlertTitle>
              <AlertDescription className="text-green-700">
                La clé API OpenAI est configurée dans Supabase et fonctionne correctement.
              </AlertDescription>
            </Alert>
          )}
          
          {!apiKeyState.isKeySet && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Clé API non configurée</AlertTitle>
              <AlertDescription>
                La clé API OpenAI n'est pas configurée ou n'est pas valide. Configurez-la dans les secrets des fonctions Edge de Supabase.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="api-key">Pour configurer la clé API OpenAI:</Label>
            <p className="text-sm text-gray-600">
              1. Accédez au tableau de bord Supabase<br/>
              2. Allez dans "Edge Functions" puis "Secrets"<br/>
              3. Ajoutez une nouvelle clé secrète nommée "OPENAI_API_KEY"<br/>
              4. Entrez votre clé API OpenAI comme valeur<br/>
              5. Cliquez sur le bouton ci-dessous pour tester la configuration
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={testApiKey} 
            disabled={apiKeyState.isTesting}
            variant={apiKeyState.isKeySet ? "outline" : "default"}
          >
            {apiKeyState.isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Test en cours...
              </>
            ) : (
              "Tester la configuration"
            )}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
