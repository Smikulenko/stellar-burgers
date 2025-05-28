import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TProfileOrderState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null | undefined;
};
const initialState: TProfileOrderState = {
  orders: [],
  loading: false,
  error: null
};
export const getProfileOrderThunk = createAsyncThunk(
  'orders/getOrderThunk ',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);
export const profileOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProfileOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    getOrder: (state) => state.orders
  }
});
export const profileOrderReducer = profileOrderSlice.reducer;
export const { getOrder } = profileOrderSlice.selectors;
