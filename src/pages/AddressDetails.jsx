import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const AddressDetails = () => {
  const { address, setAddress, getTotalPrice, formatPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: address.name || '',
    email: address.email || '',
    phone: address.phone || '',
    address: address.address || '',
    city: address.city || '',
    state: address.state || '',
    pincode: address.pincode || '',
    country: address.country || 'India'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(formData);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            💀 DELIVERY ADDRESS 💀
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Form */}
          <div className="bg-gray-900 border border-red-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-6">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    placeholder="Pincode"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    placeholder="Country"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-xl transform hover:scale-105 transition-all duration-200"
              >
                💀 PROCEED TO PAYMENT 💀
              </button>
            </form>
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

            <div className="text-sm text-gray-400">
              <p>⚠️ This is a simulation - no actual weapons will be delivered.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
