
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/components/AuthLayout';
import { useUser } from '@/components/UserContext';
import { toast } from 'sonner';

const Signup: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

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
      navigate('/profile');
      toast.success('Signup successful!');
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Sign up to start ordering your favorite treats"
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
              <p className="text-xs text-gray-500">We'll send a verification code to this number</p>
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
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>
          </>
        )}
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-dc-amber font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
