import { fireEvent, render, screen } from "@testing-library/react";
import Checkout from "../sections/checkout";
import { setCart } from "@/lib/cart";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Checkout", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setCart([]);
  });

  it.each([
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
  ])(
    "associates an inline error with an invalid $label field",
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

  it("constrains e-Money credentials to their expected lengths", () => {
    render(<Checkout />);

    expect(screen.getByLabelText("e-Money Number")).toHaveAttribute(
      "pattern",
      "^[0-9]{9}$",
    );
    expect(screen.getByLabelText("e-Money PIN")).toHaveAttribute(
      "pattern",
      "^[0-9]{4}$",
    );
  });
});
