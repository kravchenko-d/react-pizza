import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import cart from '../redux/slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart,
  },
});
