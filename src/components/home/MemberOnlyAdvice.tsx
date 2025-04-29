
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, ShoppingBag, Users, Lightbulb, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const MemberOnlyAdvice = () => {
  const { user, profile } = useAuth();
  
  // Détermine l'URL de redirection pour le bouton Espace agriculteur
  const farmerButtonUrl = user ? (profile?.role === 'farmer' ? '/farmer' : '/login') : '/login';
  const consumerButtonUrl = user ? '/buyer' : '/login';
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader className="bg-amber-50 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              Conseils pour consommateurs
            </CardTitle>
            <CardDescription>
              Conseils personnalisés selon vos achats
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Alert className="bg-amber-50 border-amber-200">
              <Lock className="h-4 w-4 text-amber-600" />
              <AlertTitle>Contenu exclusif</AlertTitle>
              <AlertDescription>
                Des conseils personnalisés sur l'utilisation et la conservation de vos produits sont disponibles dans votre espace membre après avoir effectué un achat.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center mt-6">
              <Button asChild variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                <Link to={consumerButtonUrl}>Se connecter</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="bg-green-50 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Conseils pour agriculteurs
            </CardTitle>
            <CardDescription>
              Recommandations pour votre exploitation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Alert className="bg-green-50 border-green-200">
              <Lock className="h-4 w-4 text-green-600" />
              <AlertTitle>Espace agriculteur</AlertTitle>
              <AlertDescription>
                Des conseils de culture adaptés à la saison actuelle sont disponibles dans votre espace agriculteur pour optimiser vos cultures.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center mt-6">
              <Button asChild variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                <Link to={farmerButtonUrl}>Espace agriculteur</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberOnlyAdvice;
