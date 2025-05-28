import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

type TOrderState = {
  order: TOrder | null;
  createOrder: TOrder | null;
  loading: boolean;
  error: string | null | undefined;
};
const initialState: TOrderState = {
  order: null,
  createOrder: null,
  loading: false,
  error: null
};
export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumberThunk ',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);
export const createOrderThunk = createAsyncThunk(
  'order/createOrderThunk ',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.createOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.createOrder = action.payload.order;
      });
  },
  selectors: {
    selectOrder: (state) => state.order,
    createOrderSelect: (state) => state.createOrder,
    orderLoadingSelector: (state) => state.loading
  }
});
export const { clearOrder } = OrderSlice.actions;
export const orderReducer = OrderSlice.reducer;
export const { selectOrder, orderLoadingSelector, createOrderSelect } =
  OrderSlice.selectors;
