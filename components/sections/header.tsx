"use client";

import Image from "next/image";
import MaxWidthContainer from "./max-width-container";
import Button from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full bg-dark z-100 transition-colors",
        isScrolled ? "bg-dark" : "bg-transparent",
      )}
    >
      <MaxWidthContainer
        className={cn(
          "grid grid-cols-3 border-b h-full border-b-light/20 transition-[padding] duration-200",
          isScrolled ? "py-3 xl:py-4" : "py-6 xl:py-9",
        )}
      >
        <Button className="lg:hidden" variant="ghost">
          <Image
            src="/shared/tablet/icon-hamburger.svg"
            className="me-auto"
            width="24"
            height="24"
            alt="Hamburger menu"
          />
        </Button>
        <Image
          src="/shared/desktop/logo.svg"
          className="mx-auto lg:mx-0 lg:me-auto"
          alt="Audiophile Logo"
          width="143"
          height="25"
        />
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
        <Link className="ms-auto" href="">
          <Image
            src="/shared/desktop/icon-cart.svg"
            width="24"
            height="24"
            alt="Hamburger menu"
          />
        </Link>
      </MaxWidthContainer>
    </header>
  );
};

export default Header;
