// src/components/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/home");
      } else {
        setError("ACCESS DENIED - INVALID DEATH CREDENTIALS");
      }
    } catch (err) {
      setError("DEATH REJECTS YOUR PRESENCE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-950/20 via-black to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-900/10 rounded-full blur-3xl animate-pulse-red"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative bg-gray-900/90 backdrop-blur-sm border-2 border-red-800 p-10 rounded-lg shadow-2xl w-full max-w-md death-glow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold death-text mb-2">💀 DEATH DEALER 💀</h1>
          <h2 className="text-xl text-red-400 font-mono">ARMOURY ACCESS</h2>
          <p className="text-gray-500 text-sm mt-2">ONLY THE WORTHY MAY ENTER</p>
        </div>
        
        {error && (
          <div className="bg-red-950/50 border border-red-700 text-red-300 p-4 rounded mb-6 text-center font-mono animate-pulse">
            ⚠️ {error} ⚠️
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="username" className="block text-red-400 mb-3 font-bold uppercase tracking-wider">
            Death Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Death's name..."
            className="block w-full p-4 rounded bg-gray-800/50 text-red-300 border-2 border-red-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 transition-all duration-300 font-mono"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-8">
          <label htmlFor="password" className="block text-red-400 mb-3 font-bold uppercase tracking-wider">
            Blood Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Speak the sacred numbers..."
            className="block w-full p-4 rounded bg-gray-800/50 text-red-300 border-2 border-red-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 transition-all duration-300 font-mono"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 disabled:from-gray-800 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded transition-all duration-300 transform hover:scale-105 disabled:scale-100 uppercase tracking-wider border-2 border-red-700 hover:border-red-500"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="death-loading mr-2">⚡</span>
              SUMMONING DEATH...
            </span>
          ) : (
            "🔥 ENTER THE REALM 🔥"
          )}
        </button>
        
        <div className="text-center mt-6">
          <p className="text-gray-600 text-xs font-mono">
            "Only Death may enter Death's domain"
          </p>
          <p className="text-red-700 text-sm mt-2 font-bold">
            ☠️ DEATH AWAITS ☠️
          </p>
        </div>
      </form>
    </div>
  );
}
