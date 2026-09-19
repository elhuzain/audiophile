"use client";

import { useEffect } from "react";
import Categories from "./sections/categories";

type MobileMenuProps = {
  onClose: () => void;
};

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="absolute inset-x-0 top-full z-10 h-[calc(100dvh-4.5rem)] overflow-y-auto bg-black/40 lg:hidden"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <nav
        aria-label="Product categories"
        id="mobile-navigation"
        className="rounded-b-lg bg-white pb-6 pt-20 sm:pb-16 sm:pt-28"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) onClose();
        }}
      >
        <Categories />
      </nav>
    </div>
  );
};

export default MobileMenu;
