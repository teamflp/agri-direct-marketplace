
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Cliente",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Je suis ravie d'avoir découvert AgriMarket ! Les produits sont d'une fraîcheur incomparable et j'adore connaître les agriculteurs qui cultivent ma nourriture.",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Agriculteur",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Grâce à AgriMarket, j'ai pu augmenter mes revenus de 30% et créer un lien direct avec mes clients. Une vraie révolution pour notre ferme !",
    rating: 5
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Restauratrice",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "Mon restaurant ne jure que par les produits locaux, et AgriMarket me permet de trouver facilement les meilleurs producteurs de ma région.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs pensent d'AgriMarket.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-agrimarket-orange"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-agrimarket-orange text-agrimarket-orange' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
