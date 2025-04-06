
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import AgrimarketLogo from "@/components/logo/AgrimarketLogo";
import { useAuth } from "@/contexts/AuthContext";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

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
    
    const { error } = await signIn(values.email, values.password);
    
    if (values.rememberMe) {
      // Utiliser localStorage pour se souvenir de l'e-mail (pas du mot de passe)
      localStorage.setItem('rememberedEmail', values.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    setIsLoading(false);
  };

  // Charger l'email sauvegardé si disponible
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      form.setValue('email', rememberedEmail);
      form.setValue('rememberMe', true);
    }
  }, [form]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-xl shadow-lg border-t-4 border-t-agrimarket-orange">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <AgrimarketLogo size="lg" />
              </div>
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
                              className="data-[state=checked]:bg-agrimarket-orange data-[state=checked]:border-agrimarket-orange"
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
                    className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown"
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
