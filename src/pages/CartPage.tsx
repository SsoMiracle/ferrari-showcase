import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Container from "../components/ui/Container/Container";
import EmptyState from "../components/ui/EmptyState/EmptyState";
import { useState } from "react";
import HeroButton from "../components/HeroSection/HeroButton";

import {
  decreaseQuantity,
  addToCart,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

import { cars } from "../features/cars/data/cars";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [addedId, setAddedId] = useState<number | null>(null);

  const cartProducts = cart.ids
    .map((id) => {
      const car = cars.find((c) => c.id === id);
      if (!car) return null;

      const quantity = cart.items[id]?.quantity ?? 0;

      return {
        ...car,
        quantity,
        totalPrice: car.price * quantity,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const totalAmount = cartProducts.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  );

  if (!cartProducts.length) {
    return <EmptyState message="Your cart is empty" />;
  }

  return (
    <Container>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-16 tracking-wide">
          YOUR CART
        </h1>

        {/* ITEMS */}
        <div className="flex flex-col">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="
              group
              flex items-center justify-between
              py-10
              p-12
              border-b border-gray-200
              transition-all duration-300
              hover:bg-gray-50
              hover:scale-[1.01]
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-8">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-[260px] h-[140px] object-cover"
                />

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">{product.name}</h3>

                  <p className="text-gray-500">
                    €{product.price.toLocaleString()}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      className="w-10 h-10 border border-gray-300 hover:border-black transition"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">{product.quantity}</span>

                    <button
                      onClick={() => {
                        dispatch(addToCart(product.id));
                        setAddedId(product.id);

                        setTimeout(() => {
                          setAddedId(null);
                        }, 1000);
                      }}
                      className="w-10 h-10 border border-gray-300 hover:border-black transition"
                    >
                      +
                    </button>

                    {/* FEEDBACK */}
                    {addedId === product.id && (
                      <span className="text-green-600 text-sm ml-2 animate-fade">
                        ✓ added
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-10">
                <div className="text-lg font-semibold">
                  €{product.totalPrice.toLocaleString()}
                </div>
                <HeroButton
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="border border-black"
                  target="_blank"
                >
                  <div
                    className="transition 
                    "
                  >
                    Remove
                  </div>
                </HeroButton>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          {/* LEFT (items уже выше, можно оставить пусто) */}
          <div />

          {/* RIGHT SUMMARY */}
          <div className="w-full max-w-[420px] flex flex-col gap-6 lg:ml-auto">
            <h2 className="text-xl font-medium">SUMMARY</h2>

            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>€{totalAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>€{totalAmount.toLocaleString()}</span>
            </div>

            <button
              className="
      mt-6
      py-4
      border border-black
      tracking-[0.3em]
      text-sm
      relative
      overflow-hidden
      group
      "
            >
              <span className="relative z-10 group-hover:text-white transition">
                CHECKOUT
              </span>

              <span
                className="
        absolute inset-0
        bg-black
        scale-x-0
        origin-left
        transition-transform duration-300
        group-hover:scale-x-100
        "
              />
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="text-[18px] text-gray-400 hover:text-black transition mt-2 text-left"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
