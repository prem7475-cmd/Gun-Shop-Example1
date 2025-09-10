import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('deathDealerCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [address, setAddress] = useState(() => {
    const savedAddress = localStorage.getItem('deathDealerAddress');
    return savedAddress ? JSON.parse(savedAddress) : {};
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    const savedPayment = localStorage.getItem('deathDealerPaymentMethod');
    return savedPayment ? savedPayment : '';
  });

  useEffect(() => {
    localStorage.setItem('deathDealerCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('deathDealerAddress', JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    localStorage.setItem('deathDealerPaymentMethod', paymentMethod);
  }, [paymentMethod]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.name === item.name 
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemName);
    } else {
      setCart(cart.map(item => 
        item.name === itemName ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    setAddress({});
    setPaymentMethod('');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace('₹', '').replace(/,/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getItemTotalPrice = (item) => {
    const price = parseFloat(String(item.price).replace('₹', '').replace(/,/g, ''));
    return price * (item.quantity || 1);
  };

  // Utility function to format prices consistently
  const formatPrice = (price) => {
    let numericPrice;
    if (typeof price === 'string') {
      numericPrice = parseFloat(price.replace('₹', '').replace(/,/g, ''));
    } else if (typeof price === 'number') {
      numericPrice = price;
    } else {
      numericPrice = 0;
    }

    // Handle NaN case
    if (isNaN(numericPrice)) {
      return '0';
    }

    // Format as Indian Rupee with proper comma separation
    return numericPrice.toLocaleString('en-IN');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemTotalPrice,
      getTotalItems,
      formatPrice,
      address,
      setAddress,
      paymentMethod,
      setPaymentMethod
    }}>
      {children}
    </CartContext.Provider>
  );
};
