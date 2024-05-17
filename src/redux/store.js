// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import categoryReducer from './CategorySlice';
import productReducer from './productSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    orders: ordersReducer
  }
});

export { store };
