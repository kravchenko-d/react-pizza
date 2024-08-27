import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

type Meta = {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface MetaPizzaData {
  meta: Meta;
  items: Pizza[];
}

interface PizzaSliceState {
  items: MetaPizzaData;
  status: Status;
}

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

export type SearchPizzaParams = {
  category: string;
  sortItems: string;
  search: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<MetaPizzaData, SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortItems, search, currentPage } = params;
    const res = await axios.get<MetaPizzaData>(
      `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4${category}${sortItems}${search}`,
    );

    return res.data;
  },
);

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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
