import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartButton = () => {
  const { getTotalItems, getTotalPrice, formatPrice } = useCart();

  return (
    <Link
      to="/cart"
      className="fixed top-20 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-colors cursor-pointer flex items-center gap-2"
    >
      <span>🛒</span>
      <span>{getTotalItems()} items</span>
      <span className="text-sm">₹{formatPrice(getTotalPrice())}</span>
    </Link>
  );
};

export default CartButton;
