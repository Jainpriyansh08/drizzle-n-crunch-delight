
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/components/AuthLayout';
import { useUser } from '@/components/UserContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const { login, userData } = useUser();

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      toast.success('OTP sent successfully!');
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      login(phone);
      
      // Redirect to profile if not completed, otherwise to home
      if (!userData.profile) {
        navigate('/profile');
      } else {
        navigate('/home');
      }
      
      toast.success('Login successful!');
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Login to continue your delicious journey"
    >
      <div className="space-y-4">
        {!showOtpInput ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mobile Number</label>
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="py-6 px-4 text-lg"
              />
            </div>
            
            <Button 
              onClick={handleSendOtp}
              className="w-full py-6 text-lg bg-dc-amber hover:bg-dc-amber/90"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Enter OTP</label>
              <Input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="py-6 px-4 text-lg text-center tracking-widest"
                maxLength={4}
              />
              <p className="text-xs text-gray-500">
                OTP sent to {phone}. 
                <button
                  onClick={() => setShowOtpInput(false)}
                  className="text-dc-berry ml-1 hover:underline"
                >
                  Change
                </button>
              </p>
            </div>
            
            <Button 
              onClick={handleVerifyOtp}
              className="w-full py-6 text-lg bg-dc-amber hover:bg-dc-amber/90"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </Button>
          </>
        )}
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-dc-amber font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
