
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, User } from 'lucide-react';
import { useUser } from './UserContext';

const BottomNavigation: React.FC = () => {
  const { userData } = useUser();
  const cartItemCount = userData.cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4 z-10 shadow-lg">
      <NavLink to="/home" className={({ isActive }) => 
        `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`
      }>
        {({ isActive }) => (
          <>
            <Home className={`h-6 w-6 ${isActive ? 'text-dc-amber' : 'text-gray-500'}`} />
            <span className="mt-1">Home</span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/order" className={({ isActive }) => 
        `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'} relative`
      }>
        {({ isActive }) => (
          <>
            <ShoppingCart className={`h-6 w-6 ${isActive ? 'text-dc-amber' : 'text-gray-500'}`} />
            {cartItemCount > 0 && (
              <span className="floating-badge">{cartItemCount}</span>
            )}
            <span className="mt-1">Order</span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/account" className={({ isActive }) => 
        `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`
      }>
        {({ isActive }) => (
          <>
            <User className={`h-6 w-6 ${isActive ? 'text-dc-amber' : 'text-gray-500'}`} />
            <span className="mt-1">Account</span>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
