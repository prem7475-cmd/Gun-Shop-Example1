import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import useArmouryData from "../hooks/useArmouryData";

// Protection kit card component
const ProtectionKitCard = ({ kit, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gray-900 border border-red-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-64 overflow-hidden">
        {kit.image ? (
          <img
            src={kit.image}
            alt={kit.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/1a1a1a/ff0000?text=${encodeURIComponent(kit.name)}`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-red-950/50 to-black">
            <span className="text-8xl">🛡️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center p-4">
            <h4 className="text-red-400 font-bold mb-2">Specifications</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Protection: {kit.protection}</p>
              {kit.material && <p>Material: {kit.material}</p>}
              {kit.weight && <p>Weight: {kit.weight}</p>}
              {kit.level && <p>Level: {kit.level}</p>}
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-red-900/80 text-red-300 px-3 py-1 rounded-full text-sm font-bold">
            LEVEL {kit.level || "DEATH"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors">
          {kit.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{kit.description || "Elite protection forged in Death's realm"}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
              {kit.protection}
            </span>
            {kit.material && (
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                {kit.material}
              </span>
            )}
            {kit.special && (
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                Special
              </span>
            )}
          </div>
        </div>

        {kit.special && (
          <div className="mb-4 p-3 bg-red-950/30 rounded border border-red-800/50">
            <span className="text-red-400 font-bold text-xs">⚠️ SPECIAL:</span>
            <p className="text-gray-300 text-xs mt-1">{kit.special}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">
            {kit.price ? kit.price : '₹99,600'}
          </span>
          <button
            onClick={() => onAddToCart(kit)}
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
      <h3 className="text-xl font-bold text-red-400 mb-4">Filter Protection Kits</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Protection Level</label>
          <select
            name="protection"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Levels</option>
            <option value="Level IIIA">Level IIIA</option>
            <option value="Level IIIA+">Level IIIA+</option>
            <option value="Level III+">Level III+</option>
            <option value="Level II+">Level II+</option>
            <option value="Level IV">Level IV</option>
            <option value="Level IV+">Level IV+</option>
            <option value="DEATH">DEATH Level</option>
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
            <option value="0-83000">Under ₹83,000</option>
            <option value="83000-124500">₹83,000 - ₹1,24,500</option>
            <option value="124500-149400">₹1,24,500 - ₹1,49,400</option>
            <option value="149400-207500">₹1,49,400 - ₹2,07,500</option>
            <option value="207500+">₹2,07,500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Material</label>
          <select
            name="material"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Materials</option>
            <option value="Kevlar">Kevlar</option>
            <option value="Ceramic">Ceramic</option>
            <option value="Steel">Steel</option>
            <option value="Titanium">Titanium</option>
            <option value="Carbon Fiber">Carbon Fiber</option>
            <option value="Reinforced Kevlar + Steel Plates">Reinforced Kevlar + Steel Plates</option>
            <option value="Ballistic Steel + Titanium">Ballistic Steel + Titanium</option>
            <option value="Ceramic Plates + Kevlar Weave">Ceramic Plates + Kevlar Weave</option>
            <option value="Reinforced Polymer + Steel Core">Reinforced Polymer + Steel Core</option>
            <option value="Kevlar + Leather + Steel Mesh">Kevlar + Leather + Steel Mesh</option>
            <option value="Titanium + Ceramic + Kevlar">Titanium + Ceramic + Kevlar</option>
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
            <option value="level">Protection Level</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function ProtectionKits() {
  const kits = useArmouryData("protectionKits");
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    protection: '',
    priceRange: '',
    material: '',
    sortBy: 'name'
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (kit) => {
    addToCart({
      ...kit,
      type: 'Protection Kit',
      price: kit.price || '₹99,600'
    });
    console.log(`Added ${kit.name} to cart`);
  };

  // Filter and sort protection kits
  const filteredKits = kits.filter(kit => {
    if (filters.protection && kit.protection !== filters.protection) return false;

    if (filters.material && kit.material !== filters.material) return false;

    if (filters.priceRange) {
      const price = parseInt((kit.price || '₹99,600').replace('₹', '').replace(',', ''));
      const [min, max] = filters.priceRange.split('-');
      if (max === '+') {
        if (price < parseInt(min)) return false;
      } else {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return parseInt((a.price || '₹99,600').replace('₹', '').replace(',', '')) -
               parseInt((b.price || '₹99,600').replace('₹', '').replace(',', ''));
      case 'price-high':
        return parseInt((b.price || '₹99,600').replace('₹', '').replace(',', '')) -
               parseInt((a.price || '₹99,600').replace('₹', '').replace(',', ''));
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
              PROTECTION KITS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Elite protection systems forged in Death's realm for ultimate survival
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
              Showing {filteredKits.length} of {kits.length} protection kits
            </p>
          </div>

          {/* Protection Kits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKits.map((kit, index) => (
              <ProtectionKitCard
                key={index}
                kit={kit}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredKits.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-gray-400 mb-4">No protection kits found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900/50 border-t border-red-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            ⚠️ All protection systems shown are for demonstration purposes only
          </p>
          <p className="text-red-500 font-bold">
            💀 Death Dealer Protection - Survive the Impossible 💀
          </p>
        </div>
      </footer>

      {/* Warning Section */}
      <div className="mt-12 bg-red-950/20 border-2 border-red-800 rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl text-red-400 font-bold mb-4 text-center">
          ⚠️ DEATH'S WARNING ⚠️
        </h3>
        <p className="text-gray-300 text-center">
          These protection kits have been forged in the fires of Death's realm.
          They offer protection against the most devastating attacks, but remember -
          <span className="text-red-400 font-bold"> Death always collects his due.</span>
        </p>
      </div>
    </div>
  );
}
