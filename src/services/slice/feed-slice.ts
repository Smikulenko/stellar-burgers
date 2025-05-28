import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
};
const initialState: TFeedState = {
  orders: [],
  loading: false,
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeedsThunk = createAsyncThunk(
  'feed/getFeedsThunk',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    gettotalToday: (state) => state.totalToday
  }
});
export const feedsReducer = feedSlice.reducer;
export const { getFeedOrders, getTotal, gettotalToday } = feedSlice.selectors;
