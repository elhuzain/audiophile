import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductReview from "../sections/product-review";
import { getCart, setCart } from "@/lib/cart";
import products from "@/lib/data";

const mockToastSuccess = jest.fn();

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
  },
}));

describe("ProductReview", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setCart([]);
  });

  it("adds the selected quantity to the cart and confirms with a toast", async () => {
    const user = userEvent.setup();
    const product = products.find(
      (catalogProduct) => catalogProduct.slug === "xx99-mark-two-headphones",
    );

    expect(product).toBeDefined();
    render(<ProductReview product={product!} />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(getCart()).toEqual([
      expect.objectContaining({ id: product!.id, quantity: 2 }),
    ]);
    expect(mockToastSuccess).toHaveBeenCalledWith(
      "2 × XX99 Mark II Headphones added to cart",
      { id: "cart-4" },
    );
    expect(screen.getByLabelText("Current quantity")).toHaveTextContent("1");
  });

  it("merges repeated additions into the existing cart item", async () => {
    const user = userEvent.setup();
    const product = products.find(
      (catalogProduct) => catalogProduct.slug === "xx99-mark-two-headphones",
    );

    expect(product).toBeDefined();
    setCart([
      {
        id: product!.id,
        slug: product!.slug,
        name: product!.name,
        price: product!.price,
        image: "/cart/image-xx99-mark-two-headphones.jpg",
        quantity: 2,
      },
    ]);
    render(<ProductReview product={product!} />);

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(getCart()).toHaveLength(1);
    expect(getCart()[0]).toMatchObject({ id: product!.id, quantity: 3 });
  });
});
