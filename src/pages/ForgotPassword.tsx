
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, ArrowLeft, LockKeyhole } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setEmailValue(values.email);
    
    // Simulation d'envoi d'email
    setTimeout(() => {
      toast({
        title: "Email envoyé !",
        description: `Instructions envoyées à ${values.email}`,
        variant: "info",
      });
      setEmailSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const onResetSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    
    // Simulation de réinitialisation
    setTimeout(() => {
      toast({
        title: "Mot de passe réinitialisé !",
        description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
        variant: "success",
      });
      
      // Rediriger vers la page de connexion
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToEmail = () => {
    setEmailSent(false);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                {emailSent ? (
                  <LockKeyhole className="h-16 w-16 text-agrimarket-orange" />
                ) : (
                  <Mail className="h-16 w-16 text-agrimarket-orange" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {emailSent ? "Réinitialiser le mot de passe" : "Mot de passe oublié"}
              </CardTitle>
              <CardDescription className="text-center">
                {emailSent 
                  ? `Entrez votre nouveau mot de passe pour ${emailValue}`
                  : "Entrez votre email pour recevoir un lien de réinitialisation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                    <FormField
                      control={resetForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={resetForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-agrimarket-orange hover:bg-orange-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full flex items-center justify-center"
                      onClick={handleBackToEmail}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="exemple@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-agrimarket-orange hover:bg-orange-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center">
                Vous vous souvenez de votre mot de passe?{" "}
                <Link to="/login" className="text-agrimarket-orange hover:underline">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
