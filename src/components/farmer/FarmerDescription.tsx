import React from 'react';
import type { Farmer } from './FarmerHero';

interface FarmerDescriptionProps {
  farmer: Farmer;
}

const FarmerDescription: React.FC<FarmerDescriptionProps> = ({ farmer }) => {
  return (
    <section className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">À propos de {farmer.name}</h2>
      <p className="text-gray-700 leading-relaxed">
        {farmer.description}
      </p>
    </section>
  );
};

export default FarmerDescription;
