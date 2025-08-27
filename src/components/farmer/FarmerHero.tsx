import React from 'react';

export type Farmer = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
};

interface FarmerHeroProps {
  farmer: Farmer;
}

const FarmerHero: React.FC<FarmerHeroProps> = ({ farmer }) => {
  const rating = farmer.rating ?? 0;
  const reviews = farmer.reviews ?? 0;

  return (
    <section className="relative overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="relative h-64 md:h-auto">
          <img
            src={farmer.image}
            alt={farmer.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{farmer.name}</h1>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="font-medium text-agrimarket-orange">{rating.toFixed(1)}</span>
            <span className="mx-2">•</span>
            <span>{reviews} avis</span>
          </div>
          <p className="mt-4 text-gray-700">
            {farmer.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FarmerHero;
