"use client";

import CartPopup from "../cart-popup";
import MobileMenu from "../mobile-menu";
import Image from "next/image";
import MaxWidthContainer from "./max-width-container";
import Button from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isCartOpen && !isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full bg-dark z-100 transition-colors",
        isScrolled || isCartOpen || isMenuOpen ? "bg-dark" : "bg-transparent",
      )}
    >
      <MaxWidthContainer
        className={cn(
          "relative z-20 grid grid-cols-3 border-b h-full border-b-light/20 transition-[padding] duration-200",
          isScrolled ? "py-3 xl:py-4" : "py-6 xl:py-9",
        )}
      >
        <Button
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
          className="lg:hidden"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen((isOpen) => !isOpen);
          }}
          type="button"
          variant="ghost"
        >
          <Image
            src="/shared/tablet/icon-hamburger.svg"
            className="me-auto"
            width="24"
            height="24"
            alt=""
          />
        </Button>
        <Link href="/">
          <Image
            src="/shared/desktop/logo.svg"
            className="mx-auto lg:mx-0 lg:me-auto"
            alt="Audiophile Logo"
            width="143"
            height="25"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <Link href="/">
              <Button className="text-white" variant="ghost">
                home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/category/headphones">
              <Button className="text-white" variant="ghost">
                headphones
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/category/speakers">
              <Button className="text-white" variant="ghost">
                speakers
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/category/earphones">
              <Button className="text-white" variant="ghost">
                earphones
              </Button>
            </Link>
          </li>
        </ul>
        <button
          aria-expanded={isCartOpen}
          aria-haspopup="dialog"
          aria-label="Open cart"
          className="ms-auto"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCartOpen((isOpen) => !isOpen);
          }}
          type="button"
        >
          <Image
            src="/shared/desktop/icon-cart.svg"
            width="24"
            height="24"
            alt=""
          />
        </button>
      </MaxWidthContainer>
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;
