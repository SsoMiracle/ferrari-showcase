import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const { userId, authChecked } = state.auth;
  const { hydrated, ...cart } = state.cart;

  if (!authChecked || !userId) return;
  if (!hydrated) return;

  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
