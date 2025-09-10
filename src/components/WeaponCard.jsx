import React from 'react';
import { useCart } from '../context/CartContext';

const WeaponCard = ({ weapon, type }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...weapon,
      type: type || weapon.type
    });
  };

  return (
    <div className="group relative bg-gray-900 border border-red-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-red-600">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={weapon.image} 
          alt={weapon.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/1a1a1a/ff0000?text=${encodeURIComponent(weapon.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-red-400 mb-2">{weapon.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{weapon.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">{weapon.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transform hover:scale-105 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeaponCard;
