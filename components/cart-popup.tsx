"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem, getCart, setCart } from "@/lib/cart";
import Button from "./ui/button";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type CartPopupProps = {
  onClose: () => void;
};

const CartPopup = ({ onClose }: CartPopupProps) => {
  const router = useRouter();
  const [cart, setCartState] = useState<CartItem[]>(getCart);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateCart = (nextCart: CartItem[]) => {
    setCart(nextCart);
    setCartState(nextCart);
  };

  const updateQuantity = (id: number, adjustment: number) => {
    updateCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + adjustment) }
          : item,
      ),
    );
  };

  const removeAll = () => {
    updateCart([]);
  };

  const total = cart.reduce(
    (cartTotal, item) => cartTotal + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-10 bg-black/40 px-4 pt-24 sm:pt-30"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div
        aria-labelledby="cart-title"
        aria-modal="true"
        className="max-w-270 mx-auto"
        role="dialog"
      >
        <div className="ms-auto max-h-[calc(100dvh-7rem)] w-full max-w-94 overflow-y-auto rounded-lg bg-white p-6 text-black sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 id="cart-title" className="text-h6 uppercase">
              Cart ({cart.length})
            </h2>
            {cart.length > 0 && (
              <button
                className="font-medium text-black/50 underline decoration-1 underline-offset-2 hover:text-primary"
                onClick={removeAll}
                type="button"
              >
                Remove all
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <p className="py-6 text-center font-medium text-black/50">
              Your cart is empty.
            </p>
          ) : (
            <ul className="mb-8 space-y-6">
              {cart.map((item) => (
                <li className="flex items-center gap-4" key={item.id}>
                  <Image
                    alt={item.name}
                    className="size-16 rounded-lg object-cover"
                    height={64}
                    src={item.image}
                    width={64}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold uppercase">
                      {item.name}
                    </h3>
                    <p className="font-bold text-black/50">
                      {currencyFormatter.format(item.price)}
                    </p>
                  </div>
                  <div className="grid h-8 w-24 shrink-0 grid-cols-3 bg-light text-xs font-bold">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      className="text-black/25 hover:text-primary"
                      onClick={() => updateQuantity(item.id, -1)}
                      type="button"
                    >
                      −
                    </button>
                    <span className="flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      className="text-black/25 hover:text-primary"
                      onClick={() => updateQuantity(item.id, 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mb-6 flex items-center justify-between uppercase">
            <span className="font-medium text-black/50">Total</span>
            <strong className="text-h6">
              {currencyFormatter.format(total)}
            </strong>
          </div>

          <Button
            className="w-full"
            disabled={cart.length === 0}
            onClick={() => {
              onClose();
              router.push("/checkout");
            }}
            type="button"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
