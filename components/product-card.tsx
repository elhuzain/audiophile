import Image from "next/image";
import MaxWidthContainer from "./sections/max-width-container";
import Button from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProductCard = ({
  title1,
  title2,
  isReversed = false,
  description,
  image,
  isNew,
  href
}: {
  title1: string;
  title2: string;
  isReversed?: boolean;
  description: string;
  image: string;
  isNew?: boolean;
  href: string;
}) => {
  const desktopImage = `/${image}/desktop/image-category-page-preview.jpg`;
  const mobileImage = `/${image}/mobile/image-category-page-preview.jpg`;
  const tabletImage = `/${image}/tablet/image-category-page-preview.jpg`;

  return (
    <MaxWidthContainer>
      <article className="grid xl:grid-cols-2 gap-8 xl:gap-0">
        <Image
          alt={title1 + " " + title2}
          className="w-full rounded-lg sm:hidden"
          src={mobileImage}
          width="327"
          height="352"
        />
        <Image
          alt={title1 + " " + title2}
          className="w-full rounded-lg hidden sm:block xl:hidden"
          src={tabletImage}
          width="800"
          height="440"
        />
        <Image
          alt={title1 + " " + title2}
          className={cn(
            "w-full rounded-lg hidden xl:block",
            isReversed && "sm:order-1",
          )}
          src={desktopImage}
          width="560"
          height="560"
        />
        <div
          className={cn(
            "flex flex-col items-center justify-center text-center xl:text-start xl:items-start",
            isReversed ? "xl:pe-24" : "xl:ps-24",
          )}
        >
          {isNew && (
            <span className="text-overline uppercase text-primary mb-6">
              New product
            </span>
          )}
          <h2 className="text-h2 uppercase mb-6">
            {title1}
            <br />
            {title2}
          </h2>
          <p className="opacity-50 mb-6 max-w-142.5">{description}</p>
          <Link href={href}>
            <Button>See product</Button>
          </Link>
        </div>
      </article>
    </MaxWidthContainer>
  );
};

export default ProductCard;
