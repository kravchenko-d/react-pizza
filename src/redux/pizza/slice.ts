import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaPizzaData, PizzaSliceState, SearchPizzaParams, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  items: {
    meta: {
      total_items: 0,
      total_pages: 1,
      current_page: 1,
      per_page: 4,
      remaining_count: 0,
    },
    items: []
  }, // из mokky.dev сюда попадает объект со свойствами meta и items
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<MetaPizzaData>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
