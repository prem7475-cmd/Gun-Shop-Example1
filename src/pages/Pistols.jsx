// src/pages/Pistols.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Pistol data with images
const pistols = [
  {
    id: 1,
    name: "Glock 19 - Shadow Edition",
    image: "https://source.unsplash.com/600x400/?pistol,glock",
    description: "Compact 9mm with night sights and extended mag. Perfect for concealed carry.",
    price: "₹4,50,000",
    caliber: "9mm",
    capacity: 15,
    weight: "23.6 oz",
    features: ["Night sights", "Extended mag", "Threaded barrel", "Custom grip"]
  },
  {
    id: 2,
    name: "Desert Eagle - Chrome Death",
    image: "https://source.unsplash.com/600x400/?pistol,deagle",
    description: "The hand cannon that ends conversations. .50 AE power in a stunning chrome finish.",
    price: "₹8,50,000",
    caliber: ".50 AE",
    capacity: 7,
    weight: "71.4 oz",
    features: ["Chrome finish", "Muzzle brake", "Custom grips", "Laser sight"]
  },
  {
    id: 3,
    name: "Beretta 92FS - Blood Moon",
    image: "https://source.unsplash.com/600x400/?pistol,beretta92fs",
    description: "Italian craftsmanship meets tactical precision. Custom red finish with tactical upgrades.",
    price: "₹6,50,000",
    caliber: "9mm",
    capacity: 15,
    weight: "33.3 oz",
    features: ["Red finish", "Tactical rail", "Extended barrel", "Custom trigger"]
  },
  {
    id: 4,
    name: "SIG Sauer P226 - Night Stalker",
    image: "https://source.unsplash.com/600x400/?pistol,sigp226",
    description: "Special forces favorite. Blacked out with suppressor-ready threading.",
    price: "₹7,50,000",
    caliber: "9mm",
    capacity: 15,
    weight: "34.4 oz",
    features: ["Black finish", "Suppressor ready", "Night sights", "Combat grips"]
  },
  {
    id: 5,
    name: "Colt 1911 - Demon Slayer",
    image: "https://source.unsplash.com/600x400/?pistol,colt1911",
    description: "Classic .45 ACP with modern upgrades. Custom engraved with demonic symbols.",
    price: "₹9,50,000",
    caliber: ".45 ACP",
    capacity: 8,
    weight: "38.8 oz",
    features: ["Custom engraving", "Match grade", "Skeleton trigger", "Custom grips"]
  },
  {
    id: 6,
    name: "Walther PPK - Assassin",
    image: "https://source.unsplash.com/600x400/?pistol,waltherppk",
    description: "James Bond's choice, upgraded for modern assassins. Compact and deadly.",
    price: "₹5,50,000",
    caliber: ".380 ACP",
    capacity: 7,
    weight: "22.4 oz",
    features: ["Threaded barrel", "Suppressor ready", "Custom finish", "Laser grip"]
  },
  {
    id: 7,
    name: "FN Five-seveN - Armor Piercer",
    image: "https://source.unsplash.com/600x400/?pistol,fiveseven",
    description: "High-velocity 5.7x28mm rounds that punch through body armor like paper.",
    price: "₹12,50,000",
    caliber: "5.7x28mm",
    capacity: 20,
    weight: "21.9 oz",
    features: ["Armor piercing", "High capacity", "Polymer frame", "Optics ready"]
  },
  {
    id: 8,
    name: "CZ Shadow 2 - Competition Killer",
    image: "https://source.unsplash.com/600x400/?pistol,czshadow2",
    description: "Competition-grade accuracy with tactical features. The ultimate competition pistol.",
    price: "₹10,50,000",
    caliber: "9mm",
    capacity: 17,
    weight: "46.5 oz",
    features: ["Competition sights", "Extended mag", "Custom trigger", "Weight system"]
  },
  {
    id: 9,
    name: "HK USP - Tactical",
    image: "https://source.unsplash.com/600x400/?pistol,hkusp",
    description: "German engineering meets tactical precision. Battle-tested reliability.",
    price: "₹8,50,000",
    caliber: ".45 ACP",
    capacity: 12,
    weight: "31.2 oz",
    features: ["Tactical rail", "Threaded barrel", "Night sights", "Combat finish"]
  },
  {
    id: 10,
    name: "Smith & Wesson M&P - Shadow Ops",
    image: "https://source.unsplash.com/600x400/?pistol,smithwesson",
    description: "Military-grade polymer frame with custom tactical upgrades.",
    price: "₹7,00,000",
    caliber: "9mm",
    capacity: 17,
    weight: "24.0 oz",
    features: ["Polymer frame", "Optics ready", "Threaded barrel", "Custom trigger"]
  }
];

// Pistol card component
const PistolCard = ({ pistol, onAddToCart }) => {
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
          src={pistol.image}
          alt={pistol.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/1a1a1a/ff0000?text=${encodeURIComponent(pistol.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center p-4">
            <h4 className="text-red-400 font-bold mb-2">Specifications</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Caliber: {pistol.caliber}</p>
              <p>Capacity: {pistol.capacity} rounds</p>
              <p>Weight: {pistol.weight}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors">
          {pistol.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{pistol.description}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {pistol.features.map((feature, index) => (
              <span key={index} className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">{pistol.price}</span>
          <button
            onClick={() => onAddToCart(pistol)}
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
      <h3 className="text-xl font-bold text-red-400 mb-4">Filter Pistols</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Caliber</label>
          <select
            name="caliber"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Calibers</option>
            <option value="9mm">9mm</option>
            <option value=".45 ACP">.45 ACP</option>
            <option value=".380 ACP">.380 ACP</option>
            <option value=".50 AE">.50 AE</option>
            <option value="5.7x28mm">5.7x28mm</option>
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
            <option value="0-500000">Under ₹5,00,000</option>
            <option value="500000-800000">₹5,00,000 - ₹8,00,000</option>
            <option value="800000-1000000">₹8,00,000 - ₹10,00,000</option>
            <option value="1000000+">₹10,00,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
          <select
            name="capacity"
            onChange={onFilterChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Capacities</option>
            <option value="7-10">7-10 rounds</option>
            <option value="11-15">11-15 rounds</option>
            <option value="16+">16+ rounds</option>
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
            <option value="capacity">Capacity</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function Pistols() {
  const { addToCart, getTotalItems } = useCart();
  const [filters, setFilters] = useState({
    caliber: '',
    priceRange: '',
    capacity: '',
    sortBy: 'name'
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (pistol) => {
    addToCart({
      ...pistol,
      type: 'Pistol'
    });
    console.log(`Added ${pistol.name} to cart`);
  };

  // Filter and sort pistols
  const filteredPistols = pistols.filter(pistol => {
    if (filters.caliber && pistol.caliber !== filters.caliber) return false;

    if (filters.priceRange) {
      const price = parseInt(pistol.price.replace('₹', '').replace(',', ''));
      const [min, max] = filters.priceRange.split('-');
      if (max === '+') {
        if (price < parseInt(min)) return false;
      } else {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }

    if (filters.capacity) {
      const [min, max] = filters.capacity.split('-');
      if (max === '+') {
        if (pistol.capacity < parseInt(min)) return false;
      } else {
        if (pistol.capacity < parseInt(min) || pistol.capacity > parseInt(max)) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return parseInt(a.price.replace('₹', '').replace(',', '')) -
               parseInt(b.price.replace('₹', '').replace(',', ''));
      case 'price-high':
        return parseInt(b.price.replace('₹', '').replace(',', '')) -
               parseInt(a.price.replace('₹', '').replace(',', ''));
      case 'capacity':
        return b.capacity - a.capacity;
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
              PISTOLS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Compact death dealers for close encounters and concealed carry
          </p>
        </div>
      </section>

      {/* Cart indicator */}
      <Link
        to="/cart"
        className="fixed top-20 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-colors cursor-pointer"
      >
        🛒 {getTotalItems()} items
      </Link>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredPistols.length} of {pistols.length} pistols
            </p>
          </div>

          {/* Pistols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPistols.map((pistol, index) => (
              <PistolCard
                key={pistol.id}
                pistol={pistol}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredPistols.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-gray-400 mb-4">No pistols found</h3>
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
            💀 Death Dealer Pistols - Precision in Every Shot 💀
          </p>
        </div>
      </footer>
    </div>
  );
}
