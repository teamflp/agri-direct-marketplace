
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FarmerContactPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [sent, setSent] = useState(false);

  function onSubmit(data: any) {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-4 flex items-center text-gray-600">
            <Link to={`/farmers/${id}`}>
              <ChevronLeft className="mr-1"/> Retour au profil
            </Link>
          </Button>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-agrimarket-brown"/>
              <h1 className="text-2xl font-bold mb-2">Contacter l'agriculteur</h1>
              <p className="text-gray-600 mb-6">Envoyez un message à l’agriculteur via ce formulaire.</p>
            </div>
            {sent ? (
              <div className="text-green-700 text-center font-semibold py-6">Message envoyé !</div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-1 font-medium">Votre nom</label>
                  <Input {...register("name", { required: true })} placeholder="Votre nom complet" required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Votre adresse email</label>
                  <Input {...register("email", { required: true })} type="email" placeholder="votre@email.com" required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Message</label>
                  <Textarea {...register("message", { required: true })} placeholder="Écrivez ici votre message..." rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerContactPage;
