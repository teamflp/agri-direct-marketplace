
import { Review } from './types';

// Generate a unique ID
export const generateId = (): number => {
  return Math.floor(Math.random() * 1000000);
};

// Calculate average rating for products
export const calculateAverageProductRating = (reviews: Review[] | undefined): number => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

// Calculate average rating for farmers
export const calculateAverageFarmerRating = (reviews: Review[] | undefined): number => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};
