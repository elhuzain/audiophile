import {
  CART_STORAGE_KEY,
  type CartItem,
  getCart,
  setCart,
  subscribeToCart,
} from "../cart";

const item: CartItem = {
  id: 4,
  slug: "xx99-mark-two-headphones",
  name: "XX99 Mark II Headphones",
  price: 2999,
  image: "/cart/image-xx99-mark-two-headphones.jpg",
  quantity: 2,
};

describe("cart storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setCart([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("persists and returns cart items", () => {
    setCart([item]);

    expect(
      JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]"),
    ).toEqual([item]);
    expect(getCart()).toEqual([item]);
  });

  it("notifies subscribers when the cart changes", () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToCart(listener);

    setCart([item]);

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it("filters malformed stored entries", () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([item, { id: "invalid", quantity: 0 }]),
    );

    expect(getCart()).toEqual([item]);
  });

  it("falls back to session memory when localStorage writes fail", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage is unavailable", "QuotaExceededError");
    });

    expect(() => setCart([item])).not.toThrow();
    expect(getCart()).toEqual([item]);
  });
});
