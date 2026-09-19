import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderConfirmation from "../order-confirmation";
import type { CartItem } from "@/lib/cart";

const order: CartItem[] = [
  {
    id: 4,
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    price: 2999,
    image: "/cart/image-xx99-mark-two-headphones.jpg",
    quantity: 2,
  },
  {
    id: 2,
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    price: 899,
    image: "/cart/image-xx59-headphones.jpg",
    quantity: 1,
  },
];

const ConfirmationHarness = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Pay now
      </button>
      {open && (
        <OrderConfirmation order={order} onBackHome={() => setOpen(false)} />
      )}
    </>
  );
};

describe("OrderConfirmation", () => {
  it("shows the purchased product, quantity, remaining items, and grand total", async () => {
    const user = userEvent.setup();
    render(<ConfirmationHarness />);

    await user.click(screen.getByRole("button", { name: "Pay now" }));

    const dialog = screen.getByRole("dialog", {
      name: /thank you for your order/i,
    });
    const summary = within(dialog);
    const productImage = summary.getByRole("img", {
      name: "XX99 Mark II Headphones",
    });

    expect(productImage).toHaveAttribute(
      "src",
      expect.stringContaining("image-xx99-mark-two-headphones.jpg"),
    );
    expect(summary.getByText("XX99 MK II")).toBeInTheDocument();
    expect(summary.getByText("$2,999")).toBeInTheDocument();
    expect(summary.getByText("x2")).toBeInTheDocument();
    expect(summary.getByText("and 1 other item(s)")).toBeInTheDocument();
    expect(summary.getByText("Grand total")).toBeInTheDocument();
    expect(summary.getByText("$6,947")).toBeInTheDocument();
  });

  it("keeps focus in the modal and restores the opener after closing", async () => {
    const user = userEvent.setup();
    render(<ConfirmationHarness />);

    const trigger = screen.getByRole("button", { name: "Pay now" });
    await user.click(trigger);

    const completionAction = screen.getByRole("button", {
      name: "Back to home",
    });
    expect(completionAction).toHaveFocus();

    await user.tab();
    expect(completionAction).toHaveFocus();
    await user.tab({ shift: true });
    expect(completionAction).toHaveFocus();

    await user.click(completionAction);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
