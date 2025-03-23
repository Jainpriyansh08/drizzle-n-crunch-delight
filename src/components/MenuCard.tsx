
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from './UserContext';
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, description, price, image, category }) => {
  const { userData, addToCart, updateCartItemQuantity } = useUser();
  const cartItem = userData.cart.find(item => item.id === id);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast.success(`Added ${name} to cart`);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateCartItemQuantity(id, cartItem.quantity + 1);
    } else {
      handleAddToCart();
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateCartItemQuantity(id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="h-16 w-16 rounded-full bg-gray-300"></div>
          </div>
        )}
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-dc-amber text-white text-xs font-bold px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
          <span className="text-dc-amber font-bold">₹{price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          {!cartItem || cartItem.quantity === 0 ? (
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-dc-amber hover:bg-dc-amber/90 text-white"
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 border-dc-amber text-dc-amber"
                onClick={handleDecreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-bold text-gray-800">{cartItem.quantity}</span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 border-dc-amber text-dc-amber"
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
