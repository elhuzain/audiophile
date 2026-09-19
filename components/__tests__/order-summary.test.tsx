import { render, screen, within } from "@testing-library/react";
import OrderSummary from "../order-summary";
import type { CartItem } from "@/lib/cart";

const cart: CartItem[] = [
  {
    id: 4,
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    price: 2999,
    image: "/cart/image-xx99-mark-two-headphones.jpg",
    quantity: 1,
  },
  {
    id: 2,
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    price: 899,
    image: "/cart/image-xx59-headphones.jpg",
    quantity: 2,
  },
  {
    id: 5,
    slug: "yx1-earphones",
    name: "YX1 Wireless Earphones",
    price: 599,
    image: "/cart/image-yx1-earphones.jpg",
    quantity: 1,
  },
];

const getAmount = (label: string) => {
  const term = screen.getByText(label);
  return within(term.parentElement!).getByRole("definition");
};

describe("OrderSummary", () => {
  it("calculates subtotal from prices and quantities", () => {
    render(<OrderSummary cart={cart} />);

    expect(getAmount("Total")).toHaveTextContent("$5,396");
  });

  it("calculates rounded VAT as 20% of the subtotal", () => {
    render(<OrderSummary cart={cart} />);

    expect(getAmount("VAT (included)")).toHaveTextContent("$1,079");
  });

  it("adds the flat shipping fee to the grand total", () => {
    render(<OrderSummary cart={cart} />);

    expect(getAmount("Shipping")).toHaveTextContent("$50");
    expect(getAmount("Grand total")).toHaveTextContent("$5,446");
  });

  it("uses integer rounding for VAT", () => {
    render(<OrderSummary cart={[{ ...cart[0], price: 103, quantity: 1 }]} />);

    expect(getAmount("VAT (included)")).toHaveTextContent("$21");
  });
});
