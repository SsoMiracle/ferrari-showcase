import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  quantity: number;
}

export interface CartState {
  items: Record<number, CartItem>;
  ids: number[];
  hydrated: boolean; // 🔥
}

const initialState: CartState = {
  items: {},
  ids: [],
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.ids = action.payload.ids;
      state.hydrated = true; // 🔥
    },

    addToCart(state, action: PayloadAction<number>) {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { quantity: 1 };
        state.ids.push(id);
      }
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items[id];

      if (!item) return;

      item.quantity -= 1;

      if (item.quantity === 0) {
        delete state.items[id];
        state.ids = state.ids.filter((carId) => carId !== id);
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;

      if (!state.items[id]) return;

      delete state.items[id];
      state.ids = state.ids.filter((carId) => carId !== id);
    },

    clearCart(state) {
      state.items = {};
      state.ids = [];
      state.hydrated = false; // 🔥 
    },
  },
});

export const {
  loadCart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
