import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});