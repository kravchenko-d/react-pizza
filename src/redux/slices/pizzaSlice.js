import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { category, sortItems, search, currentPage } = params;
  const res = await axios.get(
    `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4${category}${sortItems}${search}`,
  );

  return res.data;
});

const initialState = {
  items: [], // из mokky.dev сюда попадает объект со свойствами meta и items
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza.items;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
