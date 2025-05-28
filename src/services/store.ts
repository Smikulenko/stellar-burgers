import { configureStore } from '@reduxjs/toolkit';
import { ConstructorReducer } from './slice/constructor-slice';
import { ingredientsReducer } from './slice/burger-ingredients-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { feedsReducer } from './slice/feed-slice';
import { orderReducer } from './slice/order-slice';
import { userReducer } from './slice/user-slice';
import { profileOrderReducer } from './slice/profile-orders-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  Constructor: ConstructorReducer,
  ingredients: ingredientsReducer,
  feed: feedsReducer,
  order: orderReducer,
  user: userReducer,
  orders: profileOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
