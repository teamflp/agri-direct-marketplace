
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Vérifier si l'email a été passé via location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }

    // Vérifier si l'utilisateur vient d'une URL de confirmation
    const handleEmailConfirmation = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('type=signup')) {
        try {
          // Essayer de récupérer le token de confirmation
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          
          if (accessToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });

            if (error) {
              toast({
                title: "Erreur de vérification",
                description: "La vérification de votre email a échoué. Veuillez réessayer.",
                variant: "destructive",
              });
            } else {
              setIsVerified(true);
              toast({
                title: "Email vérifié !",
                description: "Votre compte a été vérifié avec succès.",
                variant: "success",
              });

              // Rediriger vers la page d'accueil après 3 secondes
              setTimeout(() => {
                navigate('/');
              }, 3000);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la vérification de l'email:", error);
        }
      }
    };

    handleEmailConfirmation();
  }, [location, navigate, toast]);

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Email manquant",
        description: "Veuillez fournir votre adresse email.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email envoyé",
          description: "Un nouveau lien de vérification a été envoyé à votre adresse email.",
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                {isVerified ? (
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                ) : (
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-12 w-12 text-blue-600" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {isVerified ? "Email vérifié avec succès !" : "Vérifiez votre email"}
              </CardTitle>
              <CardDescription className="text-center">
                {isVerified 
                  ? "Merci de confirmer votre adresse email. Vous allez être redirigé vers la page d'accueil." 
                  : `Nous avons envoyé un lien de vérification à ${email || "votre adresse email"}.`}
              </CardDescription>
            </CardHeader>

            {!isVerified && (
              <CardContent className="space-y-4 pt-4">
                <Alert>
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification pour activer votre compte AgriMarket.
                  </AlertDescription>
                </Alert>

                <div className="text-sm text-gray-600">
                  <p>Si vous ne recevez pas l'email dans les prochaines minutes :</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Vérifiez votre dossier spam ou courrier indésirable</li>
                    <li>Assurez-vous que l'adresse email est correcte</li>
                    <li>Cliquez sur "Renvoyer l'email" ci-dessous</li>
                  </ul>
                </div>
              </CardContent>
            )}

            <CardFooter className="flex flex-col space-y-3">
              {!isVerified ? (
                <>
                  <Button 
                    onClick={handleResendVerification} 
                    className="w-full"
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Renvoyer l'email"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">Retour à la connexion</Link>
                  </Button>
                </>
              ) : (
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link to="/">Aller à la page d'accueil</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EmailVerification;
