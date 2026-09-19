"use client";
import Link from "next/link";
import MaxWidthContainer from "./max-width-container";
import Image from "next/image";
import { DetailedProduct } from "@/lib/data";
import Button from "../ui/button";
import { useState } from "react";

const ProductReview = ({ product }: { product: DetailedProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="w-full">
      <div className="h-19 xl:h-25 flex w-full bg-dark" />

      <MaxWidthContainer className="pt-4 sm:pt-8">
        <section className="mb-22 sm:mb-30 lg:mb-40">
          <Link href="/" className="opacity-50 font-semibold mb-6 block">
            Go Back
          </Link>

          <div className="flex flex-col sm:flex-row sm:gap-17 lg:gap-30">
            <Image
              alt={product.name}
              className="w-full rounded-lg mb-8 sm:hidden"
              width="327"
              height="327"
              src={product.image.mobile}
            />
            <Image
              alt={product.name}
              className="w-full rounded-lg hidden sm:block lg:hidden"
              width="281"
              height="480"
              src={product.image.tablet}
            />
            <Image
              alt={product.name}
              className="rounded-lg hidden lg:block"
              width="540"
              height="560"
              src={product.image.desktop}
            />

            <div className="sm:pt-10 lg:pt-16 lg:w-full">
              {product.isNew && (
                <span className="text-overline uppercase text-primary mb-6 sm:mb-4 block">
                  New product
                </span>
              )}

              <h1 className="uppercase max-w-65 text-h4 tracking-[1px] mb-6 sm:mb-8">
                {product.name}
              </h1>

              <p className="opacity-50 mb-6 sm:mb-8 font-medium">
                {product.description}
              </p>

              <span className="font-bold text-lg block mb-8">
                {new Intl.NumberFormat("us-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </span>

              <div className="flex gap-4 items-center">
                <div className="grid grid-cols-3 w-30 h-12 bg-light">
                  <button
                    onClick={decrement}
                    className="text-center w-full h-full flex items-center justify-center opacity-50 hover:text-primary hover:opacity-100"
                  >
                    -
                  </button>
                  <span className="text-center flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increment}
                    className="text-center w-full h-full flex items-center justify-center opacity-50 hover:text-primary hover:opacity-100"
                  >
                    +
                  </button>
                </div>
                <Button>Add to cart</Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-22 sm:mb-30 lg:mb-40 grid lg:grid-cols-[2fr_1fr] lg:gap-30">
            <div className="mb-28 lg:mb-0">
              <h2 className="text-h4 uppercase mb-6 sm:mb-8">Features</h2>

              <p className="opacity-50 font-medium">{product.features}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 h-fit">
              <h2 className="text-h4 uppercase mb-6">In the box</h2>
              <ul>
                {product.includes.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-primary font-bold">
                      {item.quantity}x
                    </span>
                    <span className="opacity-50 font-medium">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <div className="w-full">
                <Image
                  width="327"
                  height="174"
                  alt={product.name}
                  src={product.gallery.first.mobile}
                  className="rounded-lg w-full object-cover mb-5 sm:hidden"
                />
                <Image
                  width="277"
                  height="174"
                  alt={product.name}
                  src={product.gallery.first.tablet}
                  className="rounded-lg w-full object-cover mb-5 hidden sm:block lg:hidden"
                />
                <Image
                  width="445"
                  height="280"
                  alt={product.name}
                  src={product.gallery.first.tablet}
                  className="rounded-lg w-full object-cover mb-5 hidden lg:block"
                />

                <Image
                  width="327"
                  height="174"
                  alt={product.name}
                  src={product.gallery.second.mobile}
                  className="rounded-lg w-full mb-5 sm:hidden"
                />
                <Image
                  width="277"
                  height="174"
                  alt={product.name}
                  src={product.gallery.second.tablet}
                  className="rounded-lg w-full object-cover hidden sm:block lg:hidden"
                />
                <Image
                  width="445"
                  height="280"
                  alt={product.name}
                  src={product.gallery.second.tablet}
                  className="rounded-lg w-full object-cover hidden lg:block"
                />
              </div>
              <Image
                width="327"
                height="368"
                alt={product.name}
                src={product.gallery.third.mobile}
                className="rounded-lg object-cover w-full sm:hidden"
              />
              <Image
                width="395"
                height="368"
                alt={product.name}
                src={product.gallery.third.tablet}
                className="rounded-lg object-cover hidden sm:block lg:hidden"
              />
              <Image
                width="612"
                height="592"
                alt={product.name}
                src={product.gallery.third.tablet}
                className="rounded-lg object-cover hidden lg:block"
              />
            </div>
          </div>
        </section>
      </MaxWidthContainer>
    </div>
  );
};

export default ProductReview;
