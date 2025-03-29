
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
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      console.log("Login attempt with:", values);
      
      // Déterminer si l'utilisateur est un agriculteur ou un consommateur
      // Dans une application réelle, cette logique serait basée sur la réponse de l'API
      const userRole = determineUserRole(values.email);
      
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur AgriMarket",
      });
      
      // Rediriger vers le tableau de bord approprié
      if (userRole === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Fonction pour déterminer le rôle de l'utilisateur (exemple simplifié)
  const determineUserRole = (email: string): "farmer" | "buyer" => {
    // Exemple : si l'email contient "farmer", on considère que c'est un agriculteur
    // Dans une application réelle, cette logique serait remplacée par une vérification
    // avec le backend ou avec les données utilisateur stockées
    if (email.includes("farmer") || email.includes("agriculteur")) {
      return "farmer";
    }
    return "buyer";
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
              <CardDescription className="text-center">
                Connectez-vous à votre compte AgriMarket
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">Se souvenir de moi</FormLabel>
                        </FormItem>
                      )}
                    />
                    <Link to="/forgot-password" className="text-sm text-agrimarket-orange hover:underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-agrimarket-orange hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center">
                Vous n'avez pas de compte?{" "}
                <Link to="/register" className="text-agrimarket-orange hover:underline">
                  Créer un compte
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

export default Login;
