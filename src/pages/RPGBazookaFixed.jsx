// src/pages/RPGBazookaFixed.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useArmouryData from "../hooks/useArmouryData";
import { useCart } from '../context/CartContext';

// RPG card component
const RPGCard = ({ rpg, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gray-900 border border-red-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={rpg.image} 
          alt={rpg.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/1a1a1a/ff0000?text=${encodeURIComponent(rpg.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center p-4">
            <h4 className="text-red-400 font-bold mb-2">Specifications</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Caliber: {rpg.caliber}</p>
              <p>Range: {rpg.range}</p>
              <p>Damage: {rpg.damage}</p>
              <p>Type: {rpg.type}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors">
          {rpg.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{rpg.description}</p>
        
        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
              {rpg.type}
            </span>
            <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
              {rpg.damage} Damage
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">{rpg.price}</span>
          <button 
            onClick={() => onAddToCart(rpg)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transform hover:scale-105 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter component
const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-gray-900 border border-red-800 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-red-400 mb-4">Filter RPGs & Bazookas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
          <select 
            name="type"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Types</option>
            <option value="Rocket-Propelled Grenade Launcher">RPG Launcher</option>
            <option value="Light Anti-Tank Weapon">Light AT Weapon</option>
            <option value="Anti-Tank Weapon">Anti-Tank Weapon</option>
            <option value="Recoilless Rifle">Recoilless Rifle</option>
            <option value="Fire-and-Forget Anti-Tank Missile">Missile System</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
          <select 
            name="priceRange"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Prices</option>
            <option value="0-2000">Under $2,000</option>
            <option value="2000-4000">$2,000 - $4,000</option>
            <option value="4000-6000">$4,000 - $6,000</option>
            <option value="6000-10000">$6,000 - $10,000</option>
            <option value="10000+">$10,000+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Caliber</label>
          <select 
            name="caliber"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Calibers</option>
            <option value="40mm">40mm</option>
            <option value="66mm">66mm</option>
            <option value="84mm">84mm</option>
            <option value="105mm">105mm</option>
            <option value="110mm">110mm</option>
            <option value="127mm">127mm</option>
            <option value="150mm">150mm</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
          <select 
            name="sortBy"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="range">Range</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function RPGBazookaFixed() {
  const rpgs = useArmouryData("rpgBazooka");
  const { addToCart, getTotalItems } = useCart();
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    caliber: '',
    sortBy: 'name'
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (rpg) => {
    addToCart({
      ...rpg,
      type: 'RPG/Bazooka'
    });
    console.log(`Added ${rpg.name} to cart`);
  };

  // Filter and sort RPGs
  const filteredRPGs = rpgs.filter(rpg => {
    if (filters.type && rpg.type !== filters.type) return false;
    
    if (filters.priceRange) {
      const price = parseInt(rpg.price.replace('$', '').replace(',', ''));
      const [min, max] = filters.priceRange.split('-');
      if (max === '+') {
        if (price < parseInt(min)) return false;
      } else {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }
    
    if (filters.caliber && rpg.caliber !== filters.caliber) return false;
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return parseInt(a.price.replace('$', '').replace(',', '')) - parseInt(b.price.replace('$', '').replace(',', ''));
      case 'price-high':
        return parseInt(b.price.replace('$', '').replace(',', '')) - parseInt(a.price.replace('$', '').replace(',', ''));
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              RPG & BAZOOKAS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Devastating anti-tank weapons and rocket launchers for maximum destruction
          </p>
        </div>
      </section>

      {/* Cart indicator */}
      <div className="fixed top-20 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        🛒 {getTotalItems()} items
      </div>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredRPGs.length} of {rpgs.length} weapons
            </p>
          </div>
          
          {/* RPGs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRPGs.map((rpg, index) => (
              <RPGCard 
                key={index} 
                rpg={rpg} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          
          {filteredRPGs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-gray-400 mb-4">No weapons found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900/50 border-t border-red-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            ⚠️ All weapons shown are for demonstration purposes only
          </p>
          <p className="text-red-500 font-bold">
            💀 Death Dealer Arsenal - Maximum Destruction Guaranteed 💀
          </p>
        </div>
      </footer>
    </div>
  );
}
