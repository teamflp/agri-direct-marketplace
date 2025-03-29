
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export type FavoriteFarmer = {
  id: number;
  farmerId: number;
  farmerName: string;
  farmName: string;
  farmerAvatar?: string;
  products: number;
  rating: number;
  dateAdded: string;
};

export type ProductShare = {
  id: number;
  productId: number;
  productName: string;
  productImage?: string;
  sharedBy: number;
  sharedTo: string; // Email or social media
  shareMethod: 'email' | 'whatsapp' | 'facebook' | 'twitter';
  shareDate: string;
  message?: string;
};

type SocialState = {
  favoriteFarmers: FavoriteFarmer[];
  productShares: ProductShare[];
  loading: boolean;
  error: string | null;
};

type SocialAction =
  | { type: 'ADD_FAVORITE_FARMER'; payload: FavoriteFarmer }
  | { type: 'REMOVE_FAVORITE_FARMER'; payload: number }
  | { type: 'SHARE_PRODUCT'; payload: ProductShare }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Mock data
const initialFavoriteFarmers: FavoriteFarmer[] = [
  {
    id: 1,
    farmerId: 2,
    farmerName: "Sophie Dubois",
    farmName: "Ferme des Quatre Saisons",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    products: 24,
    rating: 4.7,
    dateAdded: "2023-08-15"
  }
];

const initialProductShares: ProductShare[] = [];

// Initial state
const initialState: SocialState = {
  favoriteFarmers: initialFavoriteFarmers,
  productShares: initialProductShares,
  loading: false,
  error: null
};

// Reducer
const socialReducer = (state: SocialState, action: SocialAction): SocialState => {
  switch (action.type) {
    case 'ADD_FAVORITE_FARMER':
      return {
        ...state,
        favoriteFarmers: [...state.favoriteFarmers, action.payload],
      };
    case 'REMOVE_FAVORITE_FARMER':
      return {
        ...state,
        favoriteFarmers: state.favoriteFarmers.filter(farmer => farmer.id !== action.payload),
      };
    case 'SHARE_PRODUCT':
      return {
        ...state,
        productShares: [...state.productShares, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Context
type SocialContextType = {
  favoriteFarmers: FavoriteFarmer[];
  productShares: ProductShare[];
  loading: boolean;
  error: string | null;
  addFavoriteFarmer: (farmer: Omit<FavoriteFarmer, 'id' | 'dateAdded'>) => void;
  removeFavoriteFarmer: (farmerId: number) => void;
  shareProduct: (product: Omit<ProductShare, 'id' | 'shareDate'>) => void;
  isFarmerFavorite: (farmerId: number) => boolean;
  getFavoriteFarmers: () => FavoriteFarmer[];
};

const SocialContext = createContext<SocialContextType | undefined>(undefined);

// Provider
export const SocialProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(socialReducer, initialState);
  const { toast } = useToast();

  const addFavoriteFarmer = (farmerData: Omit<FavoriteFarmer, 'id' | 'dateAdded'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if farmer is already in favorites
      if (state.favoriteFarmers.some(f => f.farmerId === farmerData.farmerId)) {
        toast({
          title: "Information",
          description: "Cet agriculteur est déjà dans vos favoris",
        });
        return;
      }
      
      // In a real app, this would be an API call
      const newFavoriteFarmer = {
        ...farmerData,
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
        dateAdded: new Date().toISOString().split('T')[0], // Today's date
      };
      
      dispatch({ type: 'ADD_FAVORITE_FARMER', payload: newFavoriteFarmer });
      toast({
        title: "Agriculteur ajouté aux favoris",
        description: `${farmerData.farmerName} a été ajouté à vos favoris`,
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de l\'ajout aux favoris' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFavoriteFarmer = (farmerId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Find the farmer to get their name for the toast message
      const farmer = state.favoriteFarmers.find(f => f.id === farmerId);
      
      // In a real app, this would be an API call
      dispatch({ type: 'REMOVE_FAVORITE_FARMER', payload: farmerId });
      
      if (farmer) {
        toast({
          title: "Agriculteur retiré des favoris",
          description: `${farmer.farmerName} a été retiré de vos favoris`,
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du retrait des favoris' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const shareProduct = (productData: Omit<ProductShare, 'id' | 'shareDate'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In a real app, this would be an API call
      const newShare = {
        ...productData,
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
        shareDate: new Date().toISOString().split('T')[0], // Today's date
      };
      
      dispatch({ type: 'SHARE_PRODUCT', payload: newShare });
      toast({
        title: "Produit partagé",
        description: `${productData.productName} a été partagé via ${productData.shareMethod}`,
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du partage du produit' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du partage",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Check if a farmer is in favorites
  const isFarmerFavorite = (farmerId: number) => {
    return state.favoriteFarmers.some(f => f.farmerId === farmerId);
  };

  // Get all favorite farmers
  const getFavoriteFarmers = () => {
    return state.favoriteFarmers;
  };

  return (
    <SocialContext.Provider
      value={{
        favoriteFarmers: state.favoriteFarmers,
        productShares: state.productShares,
        loading: state.loading,
        error: state.error,
        addFavoriteFarmer,
        removeFavoriteFarmer,
        shareProduct,
        isFarmerFavorite,
        getFavoriteFarmers,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

// Hook to use the Social context
export const useSocial = (): SocialContextType => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
