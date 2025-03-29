
// Types for reviews
export type Review = {
  id: number;
  productId?: number;
  farmerId?: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
  notHelpful: number;
};

export type ReviewState = {
  productReviews: Record<number, Review[]>;
  farmerReviews: Record<number, Review[]>;
};

export type ReviewAction =
  | { type: 'ADD_PRODUCT_REVIEW'; payload: { productId: number; review: Review } }
  | { type: 'ADD_FARMER_REVIEW'; payload: { farmerId: number; review: Review } }
  | { type: 'MARK_REVIEW_HELPFUL'; payload: { id: number; productId?: number; farmerId?: number } }
  | { type: 'MARK_REVIEW_NOT_HELPFUL'; payload: { id: number; productId?: number; farmerId?: number } }
  | { type: 'LOAD_REVIEWS'; payload: ReviewState };

export type ReviewContextType = {
  reviews: ReviewState;
  addProductReview: (productId: number, rating: number, text: string) => void;
  addFarmerReview: (farmerId: number, rating: number, text: string) => void;
  markReviewHelpful: (id: number, productId?: number, farmerId?: number) => void;
  markReviewNotHelpful: (id: number, productId?: number, farmerId?: number) => void;
  getProductReviews: (productId: number) => Review[];
  getFarmerReviews: (farmerId: number) => Review[];
  getAverageProductRating: (productId: number) => number;
  getAverageFarmerRating: (farmerId: number) => number;
};
