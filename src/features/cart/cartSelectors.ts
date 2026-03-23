import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { cars } from "../cars/data/cars";

// базовые
export const selectCartIds = (state: RootState) => state.cart.ids;
export const selectCartItems = (state: RootState) => state.cart.items;

// 🔥 продукты корзины
export const selectCartProducts = createSelector(
  [selectCartIds, selectCartItems],
  (ids, items) => {
    return ids
      .map((id) => {
        const car = cars.find((c) => c.id === id);
        if (!car) return null;

        const quantity = items[id]?.quantity ?? 0;

        return {
          ...car,
          quantity,
          totalPrice: car.price * quantity,
        };
      })
      .filter(
        (product): product is NonNullable<typeof product> => product !== null,
      );
  },
);

// 🔥 total price
export const selectCartTotal = createSelector(
  [selectCartProducts],
  (products) => {
    return products.reduce((sum, product) => {
      return sum + product.totalPrice;
    }, 0);
  },
);

// 🔥 количество товаров
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => {
    return Object.values(items).reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  },
);
