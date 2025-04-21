
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

const FarmerVisitPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [visitDate, setVisitDate] = useState<Date>();
  const [sent, setSent] = useState(false);

  function onSubmit(data: any) {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    reset();
    setVisitDate(undefined);
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
              <Calendar className="w-12 h-12 mx-auto mb-4 text-agrimarket-orange"/>
              <h1 className="text-2xl font-bold mb-2">Planifier une visite</h1>
              <p className="text-gray-600 mb-6">Remplissez le formulaire afin de demander un rendez-vous auprès de l'agriculteur.</p>
            </div>
            {sent ? (
              <div className="text-green-700 text-center font-semibold py-6">Demande envoyée !</div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-1 font-medium">Votre nom</label>
                  <Input {...register("name", { required: true })} placeholder="Votre nom complet" required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <Input {...register("email", { required: true })} type="email" placeholder="votre@email.com" required/>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Date souhaitée</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        type="button"
                      >
                        {visitDate 
                          ? format(visitDate, "PPP", { locale: fr }) 
                          : <span>Choisir une date</span>
                        }
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <ShadcnCalendar
                        mode="single"
                        selected={visitDate}
                        onSelect={setVisitDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        locale={fr}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Message</label>
                  <Textarea {...register("message")} placeholder="Votre message" />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer la demande
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

export default FarmerVisitPage;
