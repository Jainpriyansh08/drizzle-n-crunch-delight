
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/components/UserContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useUser();

  useEffect(() => {
    if (userData.isAuthenticated) {
      if (userData.profile) {
        navigate('/home');
      } else {
        navigate('/profile');
      }
    }
  }, [userData, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dc-amber to-dc-maple">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-8 animate-float shadow-lg">
          <div className="text-4xl font-bold">D&C</div>
        </div>
        
        <h1 className="text-5xl font-bold mb-2 text-center animate-fade-in">
          Drizzle n Crunch
        </h1>
        <p className="text-xl mb-12 text-center opacity-90 animate-fade-in delay-100">
          Waffle & Pancake Paradise
        </p>
        
        <div className="flex flex-col w-full max-w-xs gap-4 animate-fade-in delay-200">
          <Button 
            onClick={() => navigate('/signup')}
            className="bg-white text-dc-amber hover:bg-white/90 font-bold py-6 text-lg"
          >
            Sign Up
          </Button>
          
          <Button 
            onClick={() => navigate('/login')}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 font-bold py-6 text-lg"
          >
            Login
          </Button>
        </div>
      </div>
      
      <div className="p-4 text-center text-white/80 text-sm">
        By continuing, you agree to our Terms and Privacy Policy
      </div>
    </div>
  );
};

export default Welcome;
