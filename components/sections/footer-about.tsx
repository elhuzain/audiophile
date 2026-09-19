"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import MaxWidthContainer from "./max-width-container";

const HIDDEN_PATHS = new Set(["/cart", "/checkout"]);

const FooterAbout = () => {
  const pathname = usePathname();

  if (HIDDEN_PATHS.has(pathname)) return null;

  return (
    <MaxWidthContainer>
      <section className="grid grid-cols-1 mx-auto xl:grid-cols-[1fr_1fr] xl:justify-between xl:gap-0 gap-10 mb-30 sm:mb-24 xl:mb-50">
        <Image
          src="/shared/mobile/image-best-gear.jpg"
          className="sm:hidden w-full rounded-lg"
          alt="Best gear"
          width="327"
          height="300"
        />
        <Image
          src="/shared/tablet/image-best-gear.jpg"
          className="hidden sm:block xl:hidden w-full rounded-lg"
          alt="Best gear"
          width="689"
          height="300"
        />
        <Image
          src="/shared/desktop/image-best-gear.jpg"
          className="order-1 hidden xl:block w-full rounded-lg"
          alt="Best gear"
          width="540"
          height="588"
        />
        <div className="text-center flex flex-col items-center justify-center xl:items-start xl:text-start">
          <h2 className="text-h5 sm:text-h3 uppercase mb-8 xl:mb-6 max-w-61 sm:max-w-90 tracking-[1.43px] xl:max-w-78 text-center">
            Bringing you the <span className="text-primary">best</span> audio
            gear
          </h2>
          <p className="opacity-50 xl:max-w-110">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </section>
    </MaxWidthContainer>
  );
};

export default FooterAbout;
