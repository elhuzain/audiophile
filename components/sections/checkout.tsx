"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import OrderSummary from "../order-summary";
import Input from "../ui/input";
import { getCart, getServerCart, subscribeToCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import MaxWidthContainer from "./max-width-container";

const fields = {
  billing: [
    { label: "Name", name: "name", placeholder: "Alexei Ward", type: "text" },
    {
      label: "Email Address",
      name: "email",
      placeholder: "alexei@mail.com",
      type: "email",
    },
    {
      label: "Phone Number",
      name: "phone",
      placeholder: "+1 202-555-0136",
      type: "tel",
    },
  ],
  shipping: [
    {
      label: "Your Address",
      name: "address",
      placeholder: "1137 Williams Avenue",
      type: "text",
      fullWidth: true,
    },
    { label: "ZIP Code", name: "zip", placeholder: "10001", type: "text" },
    { label: "City", name: "city", placeholder: "New York", type: "text" },
    {
      label: "Country",
      name: "country",
      placeholder: "United States",
      type: "text",
    },
  ],
};

type Field = (typeof fields.billing)[number] & { fullWidth?: boolean };

const CheckoutField = ({ field }: { field: Field }) => (
  <label
    className={cn("block", field.fullWidth && "sm:col-span-2")}
    htmlFor={field.name}
  >
    <span className="mb-2 block text-xs font-bold">{field.label}</span>
    <Input
      autoComplete={field.name}
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      required
      type={field.type}
    />
  </label>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-4 text-subtitle uppercase text-primary">{children}</h2>
);

const Checkout = () => {
  const cart = useSyncExternalStore(subscribeToCart, getCart, getServerCart);
  const [paymentMethod, setPaymentMethod] = useState("e-money");

  return (
    <main className="flex-1 bg-light pb-24 pt-24 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-38">
      <div className="h-19 xl:h-25 flex w-full bg-dark absolute top-0" />

      <MaxWidthContainer>
        <Link
          className="mb-6 inline-block font-medium text-black/50 hover:text-primary sm:mb-10"
          href="/"
        >
          Go Back
        </Link>

        <form
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="rounded-lg bg-white p-6 sm:p-8 lg:p-12">
            <h1 className="mb-8 text-h4 uppercase sm:mb-10 sm:text-h3">
              Checkout
            </h1>

            <section className="mb-8 sm:mb-12">
              <SectionHeading>Billing details</SectionHeading>
              <div className="grid gap-6 sm:grid-cols-2">
                {fields.billing.map((field) => (
                  <CheckoutField field={field} key={field.name} />
                ))}
              </div>
            </section>

            <section className="mb-8 sm:mb-12">
              <SectionHeading>Shipping info</SectionHeading>
              <div className="grid gap-6 sm:grid-cols-2">
                {fields.shipping.map((field) => (
                  <CheckoutField field={field} key={field.name} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeading>Payment details</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                <span className="text-xs font-bold">Payment Method</span>
                <div className="space-y-4">
                  {[
                    ["e-money", "e-Money"],
                    ["cash", "Cash on Delivery"],
                  ].map(([value, label]) => (
                    <label
                      className={cn(
                        "flex h-14 cursor-pointer items-center gap-4 rounded-lg border px-4 font-bold transition-colors",
                        paymentMethod === value
                          ? "border-primary"
                          : "border-black/20 hover:border-primary",
                      )}
                      key={value}
                    >
                      <input
                        checked={paymentMethod === value}
                        className="size-5 accent-primary"
                        name="paymentMethod"
                        onChange={() => setPaymentMethod(value)}
                        type="radio"
                        value={value}
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {paymentMethod === "e-money" && (
                  <div className="contents">
                    <label className="mt-4 block" htmlFor="e-money-number">
                      <span className="mb-2 block text-xs font-bold">
                        e-Money Number
                      </span>
                      <Input
                        id="e-money-number"
                        inputMode="numeric"
                        name="eMoneyNumber"
                        placeholder="238521993"
                        required
                      />
                    </label>
                    <label className="mt-4 block" htmlFor="e-money-pin">
                      <span className="mb-2 block text-xs font-bold">
                        e-Money PIN
                      </span>
                      <Input
                        id="e-money-pin"
                        inputMode="numeric"
                        name="eMoneyPin"
                        placeholder="6891"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </section>
          </div>

          <OrderSummary cart={cart} />
        </form>
      </MaxWidthContainer>
    </main>
  );
};

export default Checkout;
