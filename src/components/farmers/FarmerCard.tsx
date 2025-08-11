
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';
import { MapPin, Phone, Award, MessageCircle } from 'lucide-react';

interface FarmerCardProps {
  id: string;
  name: string;
  farmName?: string;
  location: string;
  distance?: number;
  phone?: string;
  description?: string;
  isCertified: boolean;
  rating: number;
  reviewsCount: number;
}

const FarmerCard: React.FC<FarmerCardProps> = ({
  id,
  name,
  farmName,
  location,
  distance,
  phone,
  description,
  isCertified,
  rating,
  reviewsCount
}) => {
  const { getFarmerReviews } = useUnifiedReviews();
  const farmerReviews = getFarmerReviews(id);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-agrimarket-green rounded-full flex items-center justify-center text-white font-bold">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              {farmName && (
                <p className="text-sm text-gray-600">{farmName}</p>
              )}
            </div>
          </div>
          {isCertified && (
            <Badge className="bg-green-100 text-green-800">
              <Award className="h-3 w-3 mr-1" />
              Bio
            </Badge>
          )}
        </div>
        
        <ReviewSummary reviews={farmerReviews} size="sm" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
          {distance && (
            <span className="ml-auto">({distance} km)</span>
          )}
        </div>
        
        {phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{phone}</span>
          </div>
        )}
        
        {description && (
          <p className="text-sm text-gray-700 line-clamp-3">
            {description}
          </p>
        )}
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-1" />
            Contact
          </Button>
          <Link to={`/farmers/${id}`} className="flex-1">
            <Button size="sm" className="w-full">
              Voir plus
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerCard;
