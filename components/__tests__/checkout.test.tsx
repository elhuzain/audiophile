import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkout from "../sections/checkout";
import { getCart, type CartItem, setCart } from "@/lib/cart";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

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

const fillCheckout = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Name"), "Alexei Ward");
  await user.type(screen.getByLabelText("Email Address"), "alexei@mail.com");
  await user.type(screen.getByLabelText("Phone Number"), "+1 202-555-0136");
  await user.type(
    screen.getByLabelText("Your Address"),
    "1137 Williams Avenue",
  );
  await user.type(screen.getByLabelText("ZIP Code"), "10001");
  await user.type(screen.getByLabelText("City"), "New York");
  await user.type(screen.getByLabelText("Country"), "United States");
  await user.type(screen.getByLabelText("e-Money Number"), "238521993");
  await user.type(screen.getByLabelText("e-Money PIN"), "6891");
};

describe("Checkout", () => {
  beforeEach(() => {
    mockPush.mockClear();
    window.localStorage.clear();
    setCart([]);
  });

  it.each([
    ["Name", "Name is required."],
    ["Email Address", "Email Address is required."],
    ["Phone Number", "Phone Number is required."],
    ["Your Address", "Your Address is required."],
    ["ZIP Code", "ZIP Code is required."],
    ["City", "City is required."],
    ["Country", "Country is required."],
    ["e-Money Number", "e-Money Number is required."],
    ["e-Money PIN", "e-Money PIN is required."],
  ])("associates a required error with %s", (label, message) => {
    render(<Checkout />);
    const input = screen.getByLabelText(label);

    fireEvent.invalid(input);

    const error = screen.getByRole("alert", { name: "" });
    expect(error).toHaveTextContent(message);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it.each([
    {
      label: "Email Address",
      invalidValue: "not-an-email",
      message: /enter a valid email address/i,
      validValue: "alexei@mail.com",
    },
    {
      label: "Phone Number",
      invalidValue: "not-a-phone",
      message: /enter a valid phone number/i,
      validValue: "+1 202-555-0136",
    },
    {
      label: "ZIP Code",
      invalidValue: "ABC",
      message: /enter a valid zip code/i,
      validValue: "10001",
    },
    {
      label: "e-Money Number",
      invalidValue: "1234",
      message: /enter the 9-digit e-money number/i,
      validValue: "238521993",
    },
    {
      label: "e-Money PIN",
      invalidValue: "12",
      message: /enter the 4-digit e-money pin/i,
      validValue: "6891",
    },
  ])(
    "associates and clears an inline format error for $label",
    ({ label, invalidValue, message, validValue }) => {
      render(<Checkout />);
      const input = screen.getByLabelText(label);

      fireEvent.input(input, { target: { value: invalidValue } });
      fireEvent.invalid(input);

      const error = screen.getByText(message);
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", error.id);

      fireEvent.input(input, { target: { value: validValue } });

      expect(screen.queryByText(message)).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute("aria-invalid");
    },
  );

  it.each([
    ["Name", "Name must be at least 2 characters."],
    ["Your Address", "Your Address must be at least 5 characters."],
    ["City", "City must be at least 2 characters."],
    ["Country", "Country must be at least 2 characters."],
  ])("reports the minimum length requirement for %s", (label, message) => {
    render(<Checkout />);
    const input = screen.getByLabelText(label);

    Object.defineProperty(input, "validity", {
      configurable: true,
      value: {
        patternMismatch: false,
        tooShort: true,
        typeMismatch: false,
        valueMissing: false,
      },
    });
    fireEvent.invalid(input);

    expect(screen.getByRole("alert")).toHaveTextContent(message);
  });

  it("switches to cash payment without requiring e-Money details", async () => {
    const user = userEvent.setup();
    render(<Checkout />);

    await user.click(screen.getByRole("radio", { name: "Cash on Delivery" }));

    expect(screen.queryByLabelText("e-Money Number")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("e-Money PIN")).not.toBeInTheDocument();
  });

  it("disables checkout and charges no shipping for an empty cart", () => {
    render(<Checkout />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue & Pay" }),
    ).toBeDisabled();
    expect(screen.getAllByText("$0")).toHaveLength(4);
  });

  it("completes checkout, confirms the order, clears the cart, and returns home", async () => {
    const user = userEvent.setup();
    setCart(cart);
    render(<Checkout />);
    await fillCheckout(user);

    await user.click(screen.getByRole("button", { name: "Continue & Pay" }));

    const dialog = screen.getByRole("dialog", {
      name: /thank you for your order/i,
    });
    expect(within(dialog).getByText("XX99 MK II")).toBeInTheDocument();
    expect(within(dialog).getByText("and 2 other item(s)")).toBeInTheDocument();
    expect(within(dialog).getByText("$5,446")).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: "Back to home" }),
    );

    expect(getCart()).toEqual([]);
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
