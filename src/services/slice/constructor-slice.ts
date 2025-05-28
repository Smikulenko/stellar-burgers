import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
};
const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  order: null
};
export const ConstructorSlice = createSlice({
  name: 'Constructor',
  initialState,
  reducers: {
    clearConstructor: (state) => {
      (state.bun = null), (state.ingredients = []);
    },
    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (b) => b.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      state.ingredients.splice(
        action.payload.to,
        0,
        state.ingredients.splice(action.payload.from, 1)[0]
      );
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});
export const {
  addIngredient,
  removeIngredient,
  setBun,
  moveIngredient,
  clearConstructor
} = ConstructorSlice.actions;
export const { getIngredients, getBun } = ConstructorSlice.selectors;
export const ConstructorReducer = ConstructorSlice.reducer;
