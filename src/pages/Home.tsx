
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import { useUser } from '@/components/UserContext';
import StoreCard from '@/components/StoreCard';
import { Coins, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const nearbyStores = [
  {
    id: '1',
    name: 'Drizzle n Crunch - Central Mall',
    address: '3rd Floor, Central Mall, MG Road, Bangalore',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    isOpen: true
  },
  {
    id: '2',
    name: 'Drizzle n Crunch - Indiranagar',
    address: '12th Main, Indiranagar, Bangalore',
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    isOpen: true
  },
  {
    id: '3',
    name: 'Drizzle n Crunch - JP Nagar',
    address: '5th Phase, JP Nagar, Bangalore',
    distance: '5.8 km',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    isOpen: false
  }
];

const featuredItems = [
  {
    id: '1',
    name: 'Berry Burst Waffle',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f35ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FmZmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Chocolate Heaven Pancake',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Maple Delight',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
];

const getBadgeLabel = (badge: string): string => {
  switch (badge) {
    case 'bronze': return 'Bronze Member';
    case 'silver': return 'Silver Member';
    case 'gold': return 'Gold Member';
    default: return '';
  }
};

const getBadgeColor = (badge: string): string => {
  switch (badge) {
    case 'bronze': return 'badge-bronze';
    case 'silver': return 'badge-silver';
    case 'gold': return 'badge-gold';
    default: return '';
  }
};

const Home: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

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

  const handleImageLoad = (id: string) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-b from-dc-amber to-dc-maple text-white pt-12 pb-16 px-4 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hello, {userData.profile.name.split(' ')[0]}!</h1>
              <p className="opacity-90">What would you like today?</p>
            </div>
            
            {userData.badge !== 'none' && (
              <Badge className={`${getBadgeColor(userData.badge)} px-3 py-1 flex items-center`}>
                <Award className="h-4 w-4 mr-1" />
                {getBadgeLabel(userData.badge)}
              </Badge>
            )}
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center mb-2">
            <div className="h-12 w-12 rounded-full bg-dc-amber/30 flex items-center justify-center mr-4">
              <Coins className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{userData.dcCoins} DC Coins</h3>
              <p className="text-sm opacity-90">Use them on your next order!</p>
            </div>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/order')}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-4 max-w-md mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Nearby Stores</h2>
        <div className="grid grid-cols-1 gap-4">
          {nearbyStores.map(store => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
        
        <h2 className="text-xl font-bold mt-8 mb-4">Featured Treats</h2>
        <div className="grid grid-cols-1 gap-6">
          {featuredItems.map(item => (
            <div key={item.id} className="rounded-xl overflow-hidden shadow-md relative">
              <div className="relative h-48 bg-gray-200">
                {!imageLoaded[item.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                    <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                  </div>
                )}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(item.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white font-bold text-xl p-4">{item.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
