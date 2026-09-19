import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/footer";
import FooterAbout from "@/components/sections/footer-about";
import Header from "@/components/sections/header";
import Toaster from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const homepageDescription =
  "Discover premium headphones, speakers, and earphones engineered for exceptional sound and crafted for discerning listeners.";

export const metadata: Metadata = {
  title: {
    default: "Audiophile | Homepage",
    template: "Audiophile | %s",
  },
  description: homepageDescription,
  applicationName: "Audiophile",
  authors: [{ name: "Audiophile" }],
  creator: "Audiophile",
  publisher: "Audiophile",
  keywords: [
    "audiophile",
    "headphones",
    "speakers",
    "earphones",
    "premium audio",
    "high-fidelity audio",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Audiophile",
    title: "Audiophile | Homepage",
    description: homepageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Audiophile | Homepage",
    description: homepageDescription,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <Toaster />
        {children}
        <FooterAbout />
        <Footer />
      </body>
    </html>
  );
}
