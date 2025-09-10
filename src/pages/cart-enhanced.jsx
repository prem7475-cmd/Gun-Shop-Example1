import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getItemTotalPrice, clearCart, formatPrice } = useCart();

  const handleBuyNow = () => {
    // Navigate to address page for checkout flow
    window.location.href = '/address';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            💀 DEATH DEALER CART 💀
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some weapons to get started</p>
            <Link 
              to="/home"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
            >
              Browse Weapons
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Your Arsenal</h2>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-gray-900 border border-red-800 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/64x64/1a1a1a/ff0000?text=${encodeURIComponent(item.name)}`;
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-red-400">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.type}</p>
                        <p className="text-sm text-gray-400">{item.caliber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.name, (item.quantity || 1) - 1)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, (item.quantity || 1) + 1)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="text-xl font-bold text-red-500">
                        ₹{formatPrice(getItemTotalPrice(item))}
                      </span>
                      
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="text-red-500 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 border border-red-800 rounded-lg p-6 h-fit">
              <h3 className="text-xl font-bold text-red-400 mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CGST (9%)</span>
                  <span className="text-white">₹{formatPrice(getTotalPrice() * 0.09)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SGST (9%)</span>
                  <span className="text-white">₹{formatPrice(getTotalPrice() * 0.09)}</span>
                </div>
                <div className="border-t border-red-800 pt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-red-400">Total</span>
                    <span className="text-red-500">₹{formatPrice(getTotalPrice() * 1.18)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-xl transform hover:scale-105 transition-all duration-200"
              >
                💀 BUY NOW 💀
              </button>

              <button 
                onClick={clearCart}
                className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
