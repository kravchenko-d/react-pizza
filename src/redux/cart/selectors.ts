import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.reduce((acc: number, item) => acc + ((item.id === id && item.count) || 0), 0);
