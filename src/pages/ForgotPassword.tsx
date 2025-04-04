
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Email envoyé",
          description: "Veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.",
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
      setIsLoading(false);
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
                <div className="bg-blue-100 p-3 rounded-full">
                  {isSubmitted ? (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  ) : (
                    <Mail className="h-12 w-12 text-blue-600" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {isSubmitted ? "Vérifiez votre email" : "Mot de passe oublié"}
              </CardTitle>
              <CardDescription className="text-center">
                {isSubmitted 
                  ? "Si votre email est associé à un compte, vous recevrez un lien pour réinitialiser votre mot de passe." 
                  : "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
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
                      {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Alert>
                  <AlertDescription>
                    Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation. 
                    Veuillez également vérifier votre dossier spam ou courrier indésirable.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center">
                <Link to="/login" className="flex items-center justify-center text-agrimarket-orange hover:underline">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Retour à la page de connexion
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
