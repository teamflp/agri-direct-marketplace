
import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface AddReviewFormProps {
  onSubmit: (rating: number, text: string) => void;
  title?: string;
}

export function AddReviewForm({ onSubmit, title = "Ajouter un avis" }: AddReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Veuillez sélectionner une note');
      return;
    }
    
    if (text.trim() === '') {
      setError('Veuillez saisir un avis');
      return;
    }
    
    onSubmit(rating, text);
    setRating(0);
    setText('');
    setError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Votre note</Label>
            <div className="py-2">
              <StarRating 
                rating={rating} 
                size={24} 
                interactive 
                onRatingChange={setRating} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review">Votre avis</Label>
            <Textarea
              id="review"
              placeholder="Partagez votre expérience..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-agrimarket-orange hover:bg-orange-600">
            Soumettre l'avis
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
