import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add other slices here (e.g. user, products)
  },
});

export default store;
