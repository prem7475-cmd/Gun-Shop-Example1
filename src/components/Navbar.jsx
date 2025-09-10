// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="font-bold text-xl hover:text-red-400 transition-colors">
          💀 DeathDealer Armoury
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            to="/home" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            Home
          </Link>
          <Link 
            to="/rifles" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            Rifles
          </Link>
          <Link 
            to="/pistols" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            Pistols
          </Link>
          <Link 
            to="/protection" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            Protection Kits
          </Link>
          <Link 
            to="/rpg" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            RPG/Bazuka
          </Link>
          <Link 
            to="/cart" 
            className="hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-gray-800"
          >
            Cart
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <span className="text-sm text-gray-300">
              Welcome, {user.username}
            </span>
          )}
          <button 
            onClick={handleLogout} 
            className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-bold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden mt-4">
        <div className="flex flex-col space-y-2">
          <Link 
            to="/home" 
            className="block px-3 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/rifles" 
            className="block px-3 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            Rifles
          </Link>
          <Link 
            to="/pistols" 
            className="block px-3 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            Pistols
          </Link>
          <Link 
            to="/protection" 
            className="block px-3 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            Protection Kits
          </Link>
          <Link 
            to="/rpg" 
            className="block px-3 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            RPG/Bazuka
          </Link>
        </div>
      </div>
    </nav>
  );
}
