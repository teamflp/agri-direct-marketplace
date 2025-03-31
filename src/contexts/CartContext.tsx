
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  farmerName?: string;
  farmerId?: number;
  unit?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Aliases pour maintenir la compatibilité avec les composants existants
  cart: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  };
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculer les totaux lorsque les articles changent
  useEffect(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
      }
    }
  }, []);

  // Sauvegarder le panier dans le localStorage quand il change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Vérifier si l'article existe déjà
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si l'article existe déjà
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Ajouter nouvel article
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (id: string | number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Créer un objet cart pour la compatibilité avec les composants existants
  const cart = {
    items,
    totalItems,
    totalPrice
  };

  // Aliases de fonctions pour la compatibilité
  const addToCart = addItem;
  const removeFromCart = removeItem;

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        totalPrice,
        // Ajout des alias pour compatibilité
        cart,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
