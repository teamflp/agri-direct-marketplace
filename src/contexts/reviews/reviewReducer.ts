
import { ReviewAction, ReviewState } from './types';

// Reducer function to handle review actions
export const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
  switch (action.type) {
    case 'ADD_PRODUCT_REVIEW': {
      const { productId, review } = action.payload;
      const existingReviews = state.productReviews[productId] || [];
      
      return {
        ...state,
        productReviews: {
          ...state.productReviews,
          [productId]: [...existingReviews, review]
        }
      };
    }
    
    case 'ADD_FARMER_REVIEW': {
      const { farmerId, review } = action.payload;
      const existingReviews = state.farmerReviews[farmerId] || [];
      
      return {
        ...state,
        farmerReviews: {
          ...state.farmerReviews,
          [farmerId]: [...existingReviews, review]
        }
      };
    }
    
    case 'MARK_REVIEW_HELPFUL': {
      const { id, productId, farmerId } = action.payload;
      
      if (productId) {
        return {
          ...state,
          productReviews: {
            ...state.productReviews,
            [productId]: (state.productReviews[productId] || []).map(review =>
              review.id === id ? { ...review, helpful: review.helpful + 1 } : review
            )
          }
        };
      } else if (farmerId) {
        return {
          ...state,
          farmerReviews: {
            ...state.farmerReviews,
            [farmerId]: (state.farmerReviews[farmerId] || []).map(review =>
              review.id === id ? { ...review, helpful: review.helpful + 1 } : review
            )
          }
        };
      }
      
      return state;
    }
    
    case 'MARK_REVIEW_NOT_HELPFUL': {
      const { id, productId, farmerId } = action.payload;
      
      if (productId) {
        return {
          ...state,
          productReviews: {
            ...state.productReviews,
            [productId]: (state.productReviews[productId] || []).map(review =>
              review.id === id ? { ...review, notHelpful: review.notHelpful + 1 } : review
            )
          }
        };
      } else if (farmerId) {
        return {
          ...state,
          farmerReviews: {
            ...state.farmerReviews,
            [farmerId]: (state.farmerReviews[farmerId] || []).map(review =>
              review.id === id ? { ...review, notHelpful: review.notHelpful + 1 } : review
            )
          }
        };
      }
      
      return state;
    }
    
    case 'LOAD_REVIEWS':
      return action.payload;
      
    default:
      return state;
  }
};
