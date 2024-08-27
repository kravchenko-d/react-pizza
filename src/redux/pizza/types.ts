export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type Meta = {
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

export interface MetaPizzaData {
  meta: Meta;
  items: Pizza[];
}

export interface PizzaSliceState {
  items: MetaPizzaData;
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  sortItems: string;
  search: string;
  currentPage: number;
};
