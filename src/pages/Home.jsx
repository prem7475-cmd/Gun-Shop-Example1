// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Animated background component
const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array(50).fill().map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-red-500 rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ${particle.delay}s infinite ease-in-out`
          }}
        />
      ))}
    </div>
  );
};

// Weapon card component
const WeaponCard = ({ weapon, delay }) => (
  <div 
    className="group relative bg-gray-900 border border-red-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-red-600"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-48 overflow-hidden">
      <img 
        src={weapon.image} 
        alt={weapon.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/400x300/1a1a1a/ff0000?text=${weapon.name}`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors">
        {weapon.name}
      </h3>
      <p className="text-gray-400 text-sm mb-4">{weapon.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">₹{weapon.price.toLocaleString()}</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            {weapon.category}
          </span>
        </div>
    </div>
  </div>
);

// Featured weapons data
const featuredWeapons = [
  {
    id: 1,
    name: "Hellfire Shotgun",
    image: "/images/hellfire shotgun.jpg",
    description: "Turns cover into confetti",
    price: 25000,
    category: "Shotguns"
  },
  {
    id: 2,
    name: "Reaper Minigun",
    image: "/images/Reaper minigun.webp",
    description: "For when you need to kill everyone",
    price: 100000,
    category: "Heavy Weapons"
  },
  {
    id: 3,
    name: "Widow-Maker Sniper",
    image: "/images/Widow-Maker sniper.jpg",
    description: "One shot, one kill",
    price: 150000,
    category: "Snipers"
  },
  {
    id: 4,
    name: "Blackout Kevlar",
    image: "/images/Blackout-Kevlar.webp",
    description: "Lightweight protection",
    price: 50000,
    category: "Armor"
  }
];

// Category data
const categories = [
  {
    name: "Rifles",
    path: "/rifles",
    icon: "🔫",
    description: "Precision and power",
    color: "from-red-600 to-red-800"
  },
  {
    name: "Pistols",
    path: "/pistols",
    icon: "🔫",
    description: "Compact and deadly",
    color: "from-red-700 to-red-900"
  },
  {
    name: "Protection",
    path: "/protection",
    icon: "🛡️",
    description: "Stay alive longer",
    color: "from-gray-600 to-gray-800"
  },
  {
    name: "RPG/Bazuka",
    path: "/rpg",
    icon: "💥",
    description: "Maximum destruction",
    color: "from-orange-600 to-red-800"
  }
];

export default function Home() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full page background image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/Prem.jpg" 
            alt="Prem"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-4 animate-pulse">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              DEATH DEALER
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-red-400 mb-8">
            ARMOURY
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Welcome to the most lethal arsenal on the dark web. 
            Where death meets precision and destruction becomes art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/rifles" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
            >
              Browse Armory/Weapons
            </Link>
            <Link 
              to="/protection" 
              className="border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Protected
            </Link>
          </div>
        </div>

        {/* Floating skulls */}
        <div className="absolute top-20 left-10 animate-bounce">
          <span className="text-6xl opacity-20">💀</span>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <span className="text-4xl opacity-20">💀</span>
        </div>
      </section>

      {/* Featured Weapons */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Featured Death Dealers
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Handpicked for maximum carnage</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredWeapons.map((weapon, index) => (
              <WeaponCard key={weapon.id} weapon={weapon} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Choose Your Death
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Select your weapon of choice</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                to={category.path}
                className="group relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                  
                  <div className="mt-4">
                    <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transform group-hover:scale-110 transition-transform">
                      Enter
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-900/50 p-8 rounded-lg border border-red-800">
              <div className="text-4xl font-bold text-red-500 mb-2">1000+</div>
              <div className="text-gray-400">Weapons Available</div>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg border border-red-800">
              <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-gray-400">Countries Served</div>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg border border-red-800">
              <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900/50 border-t border-red-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            ⚠️ Warning: These weapons are for entertainment purposes only. 
            All transactions are simulated.
          </p>
          <p className="text-red-500 font-bold">
            💀 Death Dealer Armoury - Where Death Meets Precision 💀
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
