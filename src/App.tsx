import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

import { checkAuth } from "./features/auth/authSlice";
import { loadCart, clearCart } from "./features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const { userId, authChecked } = useAppSelector((state) => state.auth);

  const previousUserId = useRef<string | null>(null);

  // 🔥
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // 🔥
  useEffect(() => {
    if (!authChecked) return;

    // logout
    if (!userId) {
      previousUserId.current = null;
      return;
    }

    // Change user
    if (previousUserId.current && previousUserId.current !== userId) {
      dispatch(clearCart());
    }

    previousUserId.current = userId;

    console.log("LOAD for user:", userId);

    const savedCart = localStorage.getItem(`cart_${userId}`);

    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    } else {
      dispatch(
        loadCart({
          items: {},
          ids: [],
          hydrated: true,
        }),
      );
    }

    // 🔥 
  }, [authChecked, userId, dispatch]);

  if (!authChecked) return null;

  return null;
}

export default App;
