import Image from "next/image";
import Link from "next/link";
import type { DetailedProduct } from "@/lib/data";
import { cn } from "@/lib/utils";
import MaxWidthContainer from "./sections/max-width-container";
import { buttonVariants } from "./ui/button";

type ProductCardProps = {
  isReversed?: boolean;
  product: DetailedProduct;
};

const ProductCard = ({ product, isReversed = false }: ProductCardProps) => {
  const productName = product.name.replace(
    new RegExp(` ${product.category}$`, "i"),
    "",
  );

  return (
    <MaxWidthContainer>
      <article className="grid xl:grid-cols-2 gap-8 xl:gap-0">
        <Image
          alt={product.name}
          className="w-full rounded-lg sm:hidden"
          src={product.categoryImage.mobile}
          width="327"
          height="352"
        />
        <Image
          alt={product.name}
          className="w-full rounded-lg hidden sm:block xl:hidden"
          src={product.categoryImage.tablet}
          width="800"
          height="440"
        />
        <Image
          alt={product.name}
          className={cn(
            "w-full rounded-lg hidden xl:block",
            isReversed && "sm:order-1",
          )}
          src={product.categoryImage.desktop}
          width="560"
          height="560"
        />
        <div
          className={cn(
            "flex flex-col items-center justify-center text-center xl:text-start xl:items-start",
            isReversed ? "xl:pe-24" : "xl:ps-24",
          )}
        >
          {product.isNew && (
            <span className="text-overline uppercase text-primary mb-6">
              New product
            </span>
          )}
          <h2 className="text-h2 uppercase mb-6">
            {productName}
            <br />
            {product.category}
          </h2>
          <p className="opacity-50 font-medium mb-6 max-w-142.5">
            {product.description}
          </p>
          <Link className={buttonVariants()} href={"/products/" + product.slug}>
            See product
          </Link>
        </div>
      </article>
    </MaxWidthContainer>
  );
};

export default ProductCard;
