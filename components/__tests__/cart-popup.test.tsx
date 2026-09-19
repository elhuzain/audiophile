import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPopup from "../cart-popup";
import { getCart, type CartItem, setCart } from "@/lib/cart";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const item: CartItem = {
  id: 4,
  slug: "xx99-mark-two-headphones",
  name: "XX99 Mark II Headphones",
  price: 2999,
  image: "/cart/image-xx99-mark-two-headphones.jpg",
  quantity: 1,
};

const CartHarness = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Open cart
      </button>
      {open && <CartPopup onClose={() => setOpen(false)} />}
    </>
  );
};

describe("CartPopup", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setCart([item]);
  });

  it("traps focus and restores it to the opening control", async () => {
    const user = userEvent.setup();
    render(<CartHarness />);

    const trigger = screen.getByRole("button", { name: "Open cart" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Cart (1)" });
    expect(dialog).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Remove all" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Checkout" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("persists quantity changes and can remove every item", async () => {
    const user = userEvent.setup();
    render(<CartHarness />);

    await user.click(screen.getByRole("button", { name: "Open cart" }));
    await user.click(
      screen.getByRole("button", {
        name: "Increase XX99 Mark II Headphones quantity",
      }),
    );

    expect(getCart()[0].quantity).toBe(2);

    await user.click(screen.getByRole("button", { name: "Remove all" }));
    expect(getCart()).toEqual([]);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("closes and navigates to checkout", async () => {
    const user = userEvent.setup();
    render(<CartHarness />);

    await user.click(screen.getByRole("button", { name: "Open cart" }));
    await user.click(screen.getByRole("button", { name: "Checkout" }));

    expect(mockPush).toHaveBeenCalledWith("/checkout");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
