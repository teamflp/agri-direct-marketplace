
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, CheckCircle2 } from "lucide-react";

const EmailVerification = () => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'email depuis l'état de navigation ou utiliser une valeur par défaut
  const email = location.state?.email || "votre@email.com";

  const handleVerification = async () => {
    setIsVerifying(true);
    
    // Simulation de vérification
    setTimeout(() => {
      if (code.length === 6) {
        setIsVerified(true);
        toast({
          title: "Email vérifié avec succès !",
          description: "Votre compte est maintenant activé.",
          variant: "success",
        });
        
        // Rediriger après 2 secondes
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast({
          title: "Code incorrect",
          description: "Veuillez vérifier le code et réessayer.",
          variant: "destructive",
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendCode = () => {
    toast({
      title: "Code envoyé !",
      description: `Un nouveau code a été envoyé à ${email}`,
      variant: "info",
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              {isVerified ? (
                <>
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Email Vérifié !</CardTitle>
                  <CardDescription className="text-center">
                    Votre adresse email a été vérifiée avec succès.
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <Mail className="h-16 w-16 text-agrimarket-orange" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Vérifiez votre email</CardTitle>
                  <CardDescription className="text-center">
                    Nous avons envoyé un code à {email}
                  </CardDescription>
                </>
              )}
            </CardHeader>
            
            {!isVerified && (
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                  
                  <Button 
                    onClick={handleVerification} 
                    className="w-full bg-agrimarket-orange hover:bg-orange-600"
                    disabled={isVerifying || code.length !== 6}
                  >
                    {isVerifying ? "Vérification..." : "Vérifier"}
                  </Button>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="flex flex-col space-y-2">
              {!isVerified && (
                <div className="text-sm text-center">
                  Vous n'avez pas reçu de code ?{" "}
                  <Button variant="link" className="p-0 h-auto text-agrimarket-orange" onClick={handleResendCode}>
                    Renvoyer le code
                  </Button>
                </div>
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
