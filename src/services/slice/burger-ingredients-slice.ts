import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngridientsThunk = createAsyncThunk(
  'ingredients/getIngridientsThunk',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getBuns: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'bun'),
    getMains: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'main'),
    getSauces: (state) =>
      state.ingredients.filter((ingredients) => ingredients.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngridientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngridientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});
export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getBuns,
  getMains,
  getSauces,
  getIngredientsSelector,
  getIngredientsLoading
} = ingredientsSlice.selectors;
