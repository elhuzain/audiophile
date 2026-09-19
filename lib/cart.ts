export const CART_STORAGE_KEY = "cart";
const CART_CHANGE_EVENT = "cart-change";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const EMPTY_CART: CartItem[] = [];
let cachedStorageValue: string | null | undefined;
let cachedCart = EMPTY_CART;

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
};

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return EMPTY_CART;

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart === cachedStorageValue) return cachedCart;

    cachedStorageValue = storedCart;

    if (!storedCart) {
      cachedCart = EMPTY_CART;
      return cachedCart;
    }

    const parsedCart: unknown = JSON.parse(storedCart);
    cachedCart = Array.isArray(parsedCart)
      ? parsedCart.filter(isCartItem)
      : EMPTY_CART;

    return cachedCart;
  } catch {
    return EMPTY_CART;
  }
};

export const getServerCart = (): CartItem[] => EMPTY_CART;

export const setCart = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;

  const serializedCart = JSON.stringify(cart);
  window.localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  cachedStorageValue = serializedCart;
  cachedCart = cart;
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
};

export const subscribeToCart = (listener: () => void): (() => void) => {
  if (typeof window === "undefined") return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) listener();
  };

  window.addEventListener(CART_CHANGE_EVENT, listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CART_CHANGE_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
};
