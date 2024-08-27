import { createAsyncThunk } from "@reduxjs/toolkit";
import { MetaPizzaData, SearchPizzaParams } from "./types";
import axios from "axios";

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