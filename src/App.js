import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './pages/Home';
import Pistols from './pages/Pistols';
import Rifles from './pages/Rifles';
import ProtectionKits from './pages/ProtectionKits';
import RPGBazooka from './pages/RPGBazooka';
import Cart from './pages/cart-enhanced';
import AddressDetails from './pages/AddressDetails';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Import all pages and components
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pistols" element={<Pistols />} />
                <Route path="/rifles" element={<Rifles />} />
                <Route path="/protection" element={<ProtectionKits />} />
                <Route path="/rpg" element={<RPGBazooka />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/address" element={<AddressDetails />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
