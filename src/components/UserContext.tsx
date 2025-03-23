
import React, { createContext, useState, useContext, useEffect } from 'react';

export type BadgeType = 'none' | 'bronze' | 'silver' | 'gold';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dob: string;
}

export interface UserData {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  dcCoins: number;
  orders: number;
  badge: BadgeType;
  cart: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserContextType {
  userData: UserData;
  login: (phone: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  completeOrder: () => void;
}

const defaultUserData: UserData = {
  isAuthenticated: false,
  profile: null,
  dcCoins: 0,
  orders: 0,
  badge: 'none',
  cart: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const calculateBadge = (orders: number): BadgeType => {
    if (orders >= 300) return 'gold';
    if (orders >= 150) return 'silver';
    if (orders >= 50) return 'bronze';
    return 'none';
  };

  const calculateCoinsPerOrder = (badge: BadgeType): number => {
    switch (badge) {
      case 'gold': return 125;
      case 'silver': return 100;
      case 'bronze': return 75;
      default: return 50;
    }
  };

  const login = (phone: string) => {
    setUserData(prev => ({
      ...prev,
      isAuthenticated: true,
    }));
  };

  const logout = () => {
    setUserData(defaultUserData);
    localStorage.removeItem('userData');
  };

  const updateProfile = (profile: UserProfile) => {
    setUserData(prev => ({
      ...prev,
      profile,
    }));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setUserData(prev => {
      const existingItem = prev.cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(cartItem => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          )
        };
      }
      
      return {
        ...prev,
        cart: [...prev.cart, { ...item, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (id: string) => {
    setUserData(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setUserData(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    }));
  };

  const clearCart = () => {
    setUserData(prev => ({
      ...prev,
      cart: []
    }));
  };

  const completeOrder = () => {
    const newOrders = userData.orders + 1;
    const newBadge = calculateBadge(newOrders);
    const coinsToAdd = calculateCoinsPerOrder(newBadge);
    
    setUserData(prev => ({
      ...prev,
      dcCoins: prev.dcCoins + coinsToAdd,
      orders: newOrders,
      badge: newBadge,
      cart: []
    }));
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      login, 
      logout, 
      updateProfile, 
      addToCart, 
      removeFromCart, 
      updateCartItemQuantity,
      clearCart,
      completeOrder
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
