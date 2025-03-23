
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface StoreCardProps {
  name: string;
  address: string;
  distance: string;
  image: string;
  isOpen: boolean;
}

const StoreCard: React.FC<StoreCardProps> = ({ name, address, distance, image, isOpen }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-32 bg-gray-200 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          </div>
        )}
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
        
        <div className="flex items-start text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-dc-berry" />
          <p className="line-clamp-2">{address}</p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{distance} away</span>
          <button className="text-dc-amber text-sm font-medium hover:underline">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
