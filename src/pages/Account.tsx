
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Award,
  MapPin,
  Gift,
  Clock,
  HelpCircle,
  Share2,
  LogOut,
  ChevronRight,
  Facebook,
  Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/components/UserContext';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from 'sonner';

// Helper function to format date from ISO string
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const getBadgeLabel = (badge: string): string => {
  switch (badge) {
    case 'bronze': return 'Bronze Member';
    case 'silver': return 'Silver Member';
    case 'gold': return 'Gold Member';
    default: return 'New Member';
  }
};

const getBadgeCoins = (badge: string): number => {
  switch (badge) {
    case 'gold': return 125;
    case 'silver': return 100;
    case 'bronze': return 75;
    default: return 50;
  }
};

const MenuLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="flex items-center">
      <div className="w-8 h-8 flex items-center justify-center text-dc-amber mr-3">
        {icon}
      </div>
      <span className="text-gray-800">{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </button>
);

const Account: React.FC = () => {
  const { userData, logout } = useUser();
  const navigate = useNavigate();

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

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Drizzle n Crunch App',
        text: 'Check out this amazing waffle and pancake shop app!',
        url: window.location.origin,
      })
      .catch(() => {
        toast.error('Something went wrong while sharing');
      });
    } else {
      toast.error('Web Share API not supported on this browser');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-b from-dc-amber to-dc-maple text-white py-8 px-4 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white mr-4">
              <User className="h-8 w-8" />
            </div>
            
            <div>
              <h1 className="text-xl font-bold">{userData.profile.name}</h1>
              <p className="opacity-80">{userData.profile.phone}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-sm opacity-80 mb-1">DC Coins</h3>
                <div className="text-xl font-bold mb-1">{userData.dcCoins}</div>
                <div className="text-xs mt-auto">
                  Equivalent to ₹{userData.dcCoins}
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-sm opacity-80 mb-1">Membership</h3>
                <div className="text-xl font-bold mb-1">
                  {getBadgeLabel(userData.badge)}
                </div>
                <div className="text-xs mt-auto">
                  Earn {getBadgeCoins(userData.badge)} coins per order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <MenuLink 
            icon={<Clock />} 
            label="Order History" 
            onClick={() => toast.info('Coming soon: Order History')} 
          />
          <Separator />
          <MenuLink 
            icon={<Gift />} 
            label="My Rewards" 
            onClick={() => toast.info('Coming soon: My Rewards')} 
          />
          <Separator />
          <MenuLink 
            icon={<MapPin />} 
            label="Our Stores" 
            onClick={() => navigate('/home')} 
          />
          <Separator />
          <MenuLink 
            icon={<Award />} 
            label="Rewards Program" 
            onClick={() => toast.info('Coming soon: Rewards Program Details')} 
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <MenuLink 
            icon={<HelpCircle />} 
            label="Help & FAQ" 
            onClick={() => toast.info('Coming soon: Help & FAQ')} 
          />
          <Separator />
          <MenuLink 
            icon={<Share2 />} 
            label="Share this App" 
            onClick={handleShareApp} 
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
        
        <div className="pt-8">
          <h3 className="text-center text-gray-500 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full"
              onClick={() => window.open('https://facebook.com', '_blank')}
            >
              <Facebook className="h-6 w-6 text-blue-600" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full"
              onClick={() => window.open('https://instagram.com', '_blank')}
            >
              <Instagram className="h-6 w-6 text-pink-600" />
            </Button>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 pt-4">
          <p>© 2023 Drizzle n Crunch. All rights reserved.</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Account;
