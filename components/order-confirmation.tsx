"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CartItem } from "@/lib/cart";
import Button from "./ui/button";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const SHIPPING_COST = 50;

const getShortProductName = (name: string) =>
  name
    .replace("Mark II", "MK II")
    .replace("Mark I", "MK I")
    .replace(" Wireless", "")
    .replace(/ (Headphones|Earphones|Speaker)$/, "");

type OrderConfirmationProps = {
  onBackHome: () => void;
  order: CartItem[];
};

const OrderConfirmation = ({ onBackHome, order }: OrderConfirmationProps) => {
  const actionRef = useRef<HTMLButtonElement>(null);
  const firstItem = order[0];
  const otherItemCount = order.length - 1;
  const total = order.reduce(
    (orderTotal, item) => orderTotal + item.price * item.quantity,
    0,
  );
  const grandTotal = total + SHIPPING_COST;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    actionRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!firstItem) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center overflow-y-auto bg-black/40 p-6 sm:p-10">
      <section
        aria-labelledby="order-confirmation-title"
        aria-modal="true"
        className="my-auto w-full max-w-135 rounded-lg bg-white p-8 text-black sm:p-12"
        role="dialog"
      >
        <Image
          alt=""
          className="mb-6 sm:mb-8"
          height={64}
          src="/checkout/icon-order-confirmation.svg"
          width={64}
        />

        <h2
          className="mb-4 text-h4 uppercase sm:max-w-85 sm:text-h3"
          id="order-confirmation-title"
        >
          Thank you
          <br />
          for your order
        </h2>
        <p className="mb-6 font-medium text-black/50 sm:mb-8">
          You will receive an email confirmation shortly.
        </p>

        <div className="mb-6 overflow-hidden rounded-lg sm:grid sm:grid-cols-[1.2fr_0.8fr] sm:items-stretch sm:mb-10">
          <div className="bg-light p-6">
            <div className="flex items-center gap-4">
              <Image
                alt={firstItem.name}
                className="size-13 rounded object-cover"
                height={52}
                src={firstItem.image}
                width={52}
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold uppercase">
                  {getShortProductName(firstItem.name)}
                </h3>
                <p className="font-bold text-black/50">
                  {currencyFormatter.format(firstItem.price)}
                </p>
              </div>
              <span className="self-start font-bold text-black/50">
                x{firstItem.quantity}
              </span>
            </div>

            {otherItemCount > 0 && (
              <p className="mt-3 border-t border-black/10 pt-3 text-center text-xs font-bold text-black/50">
                and {otherItemCount} other item(s)
              </p>
            )}
          </div>

          <div className="flex flex-col justify-center bg-black p-6 text-white">
            <span className="mb-2 font-medium uppercase text-white/50">
              Grand total
            </span>
            <strong className="text-h5">
              {currencyFormatter.format(grandTotal)}
            </strong>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={onBackHome}
          ref={actionRef}
          type="button"
        >
          Back to home
        </Button>
      </section>
    </div>
  );
};

export default OrderConfirmation;
