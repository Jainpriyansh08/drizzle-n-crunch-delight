
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Trash2, CreditCard, Coins } from 'lucide-react';
import { useUser } from '@/components/UserContext';
import BottomNavigation from '@/components/BottomNavigation';
import MenuCard from '@/components/MenuCard';
import { toast } from 'sonner';

// Sample menu data
const menuItems = {
  waffles: [
    {
      id: 'w1',
      name: 'Classic Belgian',
      description: 'Traditional Belgian waffle with maple syrup and butter',
      price: 199,
      image: 'https://images.unsplash.com/photo-1562376552-0d160a2f35ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FmZmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Waffles'
    },
    {
      id: 'w2',
      name: 'Chocolate Overload',
      description: 'Belgian waffle topped with chocolate sauce, chocolate chips, and whipped cream',
      price: 249,
      image: 'https://images.unsplash.com/photo-1598233847491-f16487adcd09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FmZmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Waffles'
    },
    {
      id: 'w3',
      name: 'Berry Blast',
      description: 'Belgian waffle topped with mixed berries, cream, and berry compote',
      price: 279,
      image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2FmZmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Waffles'
    },
    {
      id: 'w4',
      name: 'Banana Nutella',
      description: 'Belgian waffle topped with sliced bananas, Nutella, and whipped cream',
      price: 259,
      image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2FmZmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Waffles'
    }
  ],
  pancakes: [
    {
      id: 'p1',
      name: 'Buttermilk Stack',
      description: 'Fluffy buttermilk pancakes with maple syrup and butter',
      price: 179,
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Pancakes'
    },
    {
      id: 'p2',
      name: 'Blueberry Bliss',
      description: 'Buttermilk pancakes with fresh blueberries and blueberry compote',
      price: 219,
      image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Pancakes'
    },
    {
      id: 'p3',
      name: 'Chocolate Chip',
      description: 'Buttermilk pancakes with chocolate chips and chocolate sauce',
      price: 229,
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Pancakes'
    },
    {
      id: 'p4',
      name: 'Banana Caramel',
      description: 'Buttermilk pancakes with sliced bananas and caramel sauce',
      price: 239,
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Pancakes'
    }
  ],
  beverages: [
    {
      id: 'b1',
      name: 'Hot Chocolate',
      description: 'Rich and creamy hot chocolate with whipped cream',
      price: 129,
      image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwY2hvY29sYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Beverages'
    },
    {
      id: 'b2',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 149,
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwcHVjY2lub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      category: 'Beverages'
    },
    {
      id: 'b3',
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice',
      price: 119,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbmdlJTIwanVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      category: 'Beverages'
    }
  ]
};

const Order: React.FC = () => {
  const { userData, clearCart, completeOrder, removeFromCart, updateCartItemQuantity } = useUser();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [appliedCoins, setAppliedCoins] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!userData.isAuthenticated) {
      navigate('/');
    } else if (!userData.profile) {
      navigate('/profile');
    }
  }, [userData, navigate]);

  if (!userData.isAuthenticated || !userData.profile) {
    return null;
  }

  const cartTotal = userData.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = appliedCoins;
  const finalTotal = cartTotal - discountAmount > 0 ? cartTotal - discountAmount : 0;

  const handleApplyCoins = () => {
    if (appliedCoins > 0) {
      setAppliedCoins(0);
      toast.success('DC Coins removed');
      return;
    }
    
    const coinsToApply = Math.min(userData.dcCoins, cartTotal);
    setAppliedCoins(coinsToApply);
    toast.success(`${coinsToApply} DC Coins applied`);
  };

  const handleCheckout = () => {
    if (userData.cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      completeOrder();
      setAppliedCoins(0);
      setIsProcessing(false);
      setShowCart(false);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-dc-amber text-white py-6 px-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Menu</h1>
            <p className="opacity-90">Browse our delicious selection</p>
          </div>
          
          {userData.cart.length > 0 && (
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {userData.cart.reduce((total, item) => total + item.quantity, 0)}
            </Button>
          )}
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 py-6">
        <Tabs defaultValue="waffles">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="waffles" className="flex-1">Waffles</TabsTrigger>
            <TabsTrigger value="pancakes" className="flex-1">Pancakes</TabsTrigger>
            <TabsTrigger value="beverages" className="flex-1">Beverages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="waffles" className="space-y-4">
            {menuItems.waffles.map(item => (
              <MenuCard key={item.id} {...item} />
            ))}
          </TabsContent>
          
          <TabsContent value="pancakes" className="space-y-4">
            {menuItems.pancakes.map(item => (
              <MenuCard key={item.id} {...item} />
            ))}
          </TabsContent>
          
          <TabsContent value="beverages" className="space-y-4">
            {menuItems.beverages.map(item => (
              <MenuCard key={item.id} {...item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-3xl max-h-[80vh] animate-slide-in-up flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <Button 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setShowCart(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {userData.cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.cart.map(item => (
                    <div key={item.id} className="flex items-center pb-4 border-b border-gray-100">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-200 mr-3">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-dc-amber font-bold">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-gray-300"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        
                        <span className="mx-2 font-medium">{item.quantity}</span>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-gray-300"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            {userData.cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cartTotal}</span>
                </div>
                
                {appliedCoins > 0 && (
                  <div className="flex justify-between items-center text-dc-amber">
                    <span>DC Coins Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <Button
                    variant={appliedCoins > 0 ? "destructive" : "outline"}
                    className="flex-1"
                    onClick={handleApplyCoins}
                    disabled={userData.dcCoins === 0 || isProcessing}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    {appliedCoins > 0 ? `Remove ${appliedCoins} Coins` : `Apply DC Coins (${userData.dcCoins})`}
                  </Button>
                  
                  <Button
                    className="flex-1 bg-dc-amber hover:bg-dc-amber/90"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default Order;
