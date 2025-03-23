
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useUser } from '@/components/UserContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateProfile } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!date) {
      toast.error('Please select your date of birth');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile({
        name,
        email,
        dob: date.toISOString(),
        phone: '1234567890' // This would normally come from the auth process
      });
      
      setIsLoading(false);
      navigate('/home');
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-dc-cream to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Complete Your Profile</h1>
          <p className="text-gray-600">Let us know more about you</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-5"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-5"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full py-5 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select your date of birth</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full py-6 text-lg bg-dc-amber hover:bg-dc-amber/90"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Continue'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
