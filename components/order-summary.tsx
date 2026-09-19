import Image from "next/image";
import type { CartItem } from "@/lib/cart";
import Button from "./ui/button";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const SHIPPING_COST = 50;
const VAT_RATE = 0.2;

const getShortProductName = (name: string) =>
  name
    .replace("Mark II", "MK II")
    .replace("Mark I", "MK I")
    .replace(" Wireless", "")
    .replace(/ (Headphones|Earphones|Speaker)$/, "");

type OrderSummaryProps = {
  cart: CartItem[];
};

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const total = cart.reduce(
    (cartTotal, item) => cartTotal + item.price * item.quantity,
    0,
  );
  const vat = Math.round(total * VAT_RATE);
  const shipping = cart.length > 0 ? SHIPPING_COST : 0;
  const grandTotal = total + shipping;

  return (
    <aside className="rounded-lg bg-white p-6 sm:p-8 lg:sticky lg:top-22">
      <h2 className="mb-8 text-h6 uppercase">Summary</h2>

      {cart.length === 0 ? (
        <p className="mb-8 py-4 text-center font-medium text-black/50">
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
                  {getShortProductName(item.name)}
                </h3>
                <p className="font-bold text-black/50">
                  {currencyFormatter.format(item.price)}
                </p>
              </div>
              <span className="font-bold text-black/50">x{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="space-y-2 uppercase">
        <div className="flex items-center justify-between">
          <dt className="font-medium text-black/50">Total</dt>
          <dd className="text-h6">{currencyFormatter.format(total)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-medium text-black/50">Shipping</dt>
          <dd className="text-h6">{currencyFormatter.format(shipping)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-medium text-black/50">VAT (included)</dt>
          <dd className="text-h6">{currencyFormatter.format(vat)}</dd>
        </div>
        <div className="flex items-center justify-between pt-4">
          <dt className="font-medium text-black/50">Grand total</dt>
          <dd className="text-h6 text-primary">
            {currencyFormatter.format(grandTotal)}
          </dd>
        </div>
      </dl>

      <Button
        className="mt-8 w-full"
        disabled={cart.length === 0}
        type="submit"
      >
        Continue & Pay
      </Button>
    </aside>
  );
};

export default OrderSummary;
