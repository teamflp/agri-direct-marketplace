
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import PlanUpgradeDialog from './PlanUpgradeDialog';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

interface SubscriptionPlansProps {
  plans: Plan[];
}

const SubscriptionPlans = ({ plans }: SubscriptionPlansProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'border-agrimarket-orange' : ''} ${plan.current ? 'bg-gray-50' : ''}`}>
          {plan.popular && (
            <div className="bg-agrimarket-orange text-white text-xs font-bold px-3 py-1 text-center">
              POPULAIRE
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="mt-2">
              <span className="text-2xl font-bold">{plan.price.toLocaleString()} FCFA</span>
              <span className="text-gray-500">/mois</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-agrimarket-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <PlanUpgradeDialog 
              planName={plan.name}
              planPrice={plan.price} 
              planFeatures={plan.features}
              currentPlan={plan.current || false}
              popular={plan.popular || false}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
