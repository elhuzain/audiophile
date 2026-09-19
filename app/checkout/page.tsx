import type { Metadata } from "next";
import Checkout from "@/components/sections/checkout";

const checkoutDescription =
  "Complete your Audiophile order with secure billing, shipping, and payment details.";

export const metadata: Metadata = {
  title: "Checkout",
  description: checkoutDescription,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Audiophile | Checkout",
    description: checkoutDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audiophile | Checkout",
    description: checkoutDescription,
  },
};

export default function CheckoutPage() {
  return <Checkout />;
}
