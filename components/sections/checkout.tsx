"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import OrderConfirmation from "../order-confirmation";
import OrderSummary from "../order-summary";
import Input from "../ui/input";
import {
  type CartItem,
  getCart,
  getServerCart,
  setCart,
  subscribeToCart,
} from "@/lib/cart";
import { cn } from "@/lib/utils";
import MaxWidthContainer from "./max-width-container";

type Field = {
  autoComplete: string;
  className?: string;
  fullWidth?: boolean;
  inputMode?: React.ComponentProps<"input">["inputMode"];
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  pattern?: string;
  patternMessage?: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

const fields: { billing: Field[]; shipping: Field[]; payment: Field[] } = {
  billing: [
    {
      autoComplete: "name",
      label: "Name",
      maxLength: 50,
      minLength: 2,
      name: "name",
      placeholder: "Alexei Ward",
      type: "text",
    },
    {
      autoComplete: "email",
      label: "Email Address",
      maxLength: 100,
      name: "email",
      placeholder: "alexei@mail.com",
      type: "email",
    },
    {
      autoComplete: "tel",
      inputMode: "tel",
      label: "Phone Number",
      maxLength: 20,
      name: "phone",
      pattern: "^\\+?[0-9 ()-]{7,20}$",
      patternMessage:
        "Enter a valid phone number using 7 to 20 digits and standard separators.",
      placeholder: "+1 202-555-0136",
      type: "tel",
    },
  ],
  shipping: [
    {
      autoComplete: "street-address",
      fullWidth: true,
      label: "Your Address",
      maxLength: 100,
      minLength: 5,
      name: "address",
      placeholder: "1137 Williams Avenue",
      type: "text",
    },
    {
      autoComplete: "postal-code",
      inputMode: "numeric",
      label: "ZIP Code",
      maxLength: 10,
      name: "zip",
      pattern: "^[0-9]{5}(-[0-9]{4})?$",
      patternMessage: "Enter a valid ZIP code, such as 10001 or 10001-1234.",
      placeholder: "10001",
      type: "text",
    },
    {
      autoComplete: "address-level2",
      label: "City",
      maxLength: 50,
      minLength: 2,
      name: "city",
      placeholder: "New York",
      type: "text",
    },
    {
      autoComplete: "country-name",
      label: "Country",
      maxLength: 56,
      minLength: 2,
      name: "country",
      placeholder: "United States",
      type: "text",
    },
  ],
  payment: [
    {
      autoComplete: "off",
      className: "mt-4",
      inputMode: "numeric",
      label: "e-Money Number",
      maxLength: 9,
      name: "e-money-number",
      pattern: "^[0-9]{9}$",
      patternMessage: "Enter the 9-digit e-Money number.",
      placeholder: "238521993",
      type: "text",
    },
    {
      autoComplete: "off",
      className: "mt-4",
      inputMode: "numeric",
      label: "e-Money PIN",
      maxLength: 4,
      name: "e-money-pin",
      pattern: "^[0-9]{4}$",
      patternMessage: "Enter the 4-digit e-Money PIN.",
      placeholder: "6891",
      type: "text",
    },
  ],
};

const getFieldError = (input: HTMLInputElement, field: Field) => {
  if (input.validity.valueMissing) return `${field.label} is required.`;
  if (input.validity.typeMismatch)
    return `Enter a valid ${field.label.toLowerCase()}.`;
  if (input.validity.tooShort)
    return `${field.label} must be at least ${field.minLength} characters.`;
  if (input.validity.patternMismatch)
    return (
      field.patternMessage ?? `Enter a valid ${field.label.toLowerCase()}.`
    );
  return "";
};

const CheckoutField = ({ field }: { field: Field }) => {
  const [error, setError] = useState("");
  const errorId = `${field.name}-error`;

  return (
    <label
      className={cn(
        "block",
        field.fullWidth && "sm:col-span-2",
        field.className,
      )}
      htmlFor={field.name}
    >
      <span className="mb-2 block text-xs font-bold">{field.label}</span>
      <Input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={field.autoComplete}
        id={field.name}
        inputMode={field.inputMode}
        maxLength={field.maxLength}
        minLength={field.minLength}
        name={field.name}
        onInput={(event) => {
          if (error) setError(getFieldError(event.currentTarget, field));
        }}
        onInvalid={(event) => {
          setError(getFieldError(event.currentTarget, field));
        }}
        pattern={field.pattern}
        placeholder={field.placeholder}
        required
        type={field.type}
      />
      {error && (
        <span
          className="mt-1.5 block text-xs font-medium text-red-600"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      )}
    </label>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-4 text-subtitle uppercase text-primary">{children}</h2>
);

const Checkout = () => {
  const router = useRouter();
  const cart = useSyncExternalStore(subscribeToCart, getCart, getServerCart);
  const [paymentMethod, setPaymentMethod] = useState("e-money");
  const [confirmedOrder, setConfirmedOrder] = useState<CartItem[] | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length > 0) {
      setConfirmedOrder(cart.map((item) => ({ ...item })));
    }
  };

  const handleBackHome = () => {
    setCart([]);
    setConfirmedOrder(null);
    router.push("/");
  };

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
          onSubmit={handleSubmit}
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
                    {fields.payment.map((field) => (
                      <CheckoutField field={field} key={field.name} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          <OrderSummary cart={cart} />
        </form>
      </MaxWidthContainer>

      {confirmedOrder && (
        <OrderConfirmation onBackHome={handleBackHome} order={confirmedOrder} />
      )}
    </main>
  );
};

export default Checkout;
