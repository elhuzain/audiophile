import { useState } from "react";
import { render, screen } from "@testing-library/react";
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
