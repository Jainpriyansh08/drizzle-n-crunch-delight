
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-dc-cream to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 text-dc-amber">Drizzle n Crunch</h1>
          <div className="h-1 w-24 bg-dc-berry mx-auto mb-4 rounded-full"></div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-scale-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
