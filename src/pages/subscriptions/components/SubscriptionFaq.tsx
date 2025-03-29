
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionnent les abonnements aux paniers ?",
    answer: "Nos abonnements permettent de recevoir régulièrement des paniers de produits frais directement de nos agriculteurs partenaires. Vous choisissez la fréquence (hebdomadaire, bimensuelle ou mensuelle) et le type de panier. Votre carte est débitée automatiquement avant chaque livraison, et vous pouvez mettre en pause ou annuler votre abonnement à tout moment."
  },
  {
    question: "Puis-je personnaliser le contenu de mon panier ?",
    answer: "Le contenu des paniers est défini par l'agriculteur en fonction des récoltes de saison. Cependant, certains agriculteurs proposent des options de personnalisation où vous pouvez échanger certains produits. Vous pouvez contacter directement l'agriculteur pour discuter des possibilités de personnalisation."
  },
  {
    question: "Comment sont livrés les paniers ?",
    answer: "Les paniers sont livrés directement à votre domicile ou à un point relais, selon les options disponibles dans votre région. La livraison est généralement effectuée dans les 24 à 48 heures suivant la récolte, garantissant ainsi la fraîcheur maximale des produits."
  },
  {
    question: "Que se passe-t-il si je ne suis pas chez moi lors de la livraison ?",
    answer: "Si vous n'êtes pas disponible lors de la livraison, vous pouvez indiquer un lieu sûr où déposer votre panier (véranda, chez un voisin, etc.) dans les instructions de livraison. Vous pouvez également choisir de recevoir votre panier à un point relais où il sera conservé jusqu'à votre passage."
  },
  {
    question: "Comment puis-je annuler ou mettre en pause mon abonnement ?",
    answer: "Vous pouvez gérer votre abonnement directement depuis votre espace client dans la section 'Mes abonnements'. Vous y trouverez des options pour mettre en pause votre abonnement (pour les vacances par exemple) ou l'annuler définitivement. L'annulation doit être effectuée au moins 48h avant la prochaine livraison prévue."
  },
  {
    question: "Les produits sont-ils tous biologiques ?",
    answer: "Tous nos agriculteurs partenaires pratiquent une agriculture respectueuse de l'environnement. La majorité des produits sont certifiés biologiques, mais certains agriculteurs sont en conversion ou pratiquent une agriculture raisonnée sans avoir le label. Les méthodes de production sont clairement indiquées pour chaque agriculteur sur notre plateforme."
  }
];

const SubscriptionFaq = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez des réponses aux questions les plus courantes sur nos abonnements
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Vous avez d'autres questions ? Contactez notre équipe
        </p>
        <Button className="bg-agrimarket-green hover:bg-green-700 text-white">
          Nous contacter
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionFaq;
