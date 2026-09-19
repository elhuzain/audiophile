import Image from "next/image";
import Link from "next/link";
import Button from "./ui/button";

const YouMayAlsoLikeCard = ({
  product,
}: {
  product: {
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
}) => {
  return (
    <article className="text-center">
      <Image
        alt={product.name}
        width="327"
        height="120"
        className="w-full sm:hidden mb-8 rounded-lg"
        src={product.image.mobile}
      />
      <Image
        alt={product.name}
        width="233"
        height="318"
        className="w-full hidden sm:block lg:hidden mb-10 rounded-lg"
        src={product.image.tablet}
      />
      <Image
        alt={product.name}
        width="350"
        height="318"
        className="w-full hidden lg:block mb-10 rounded-lg"
        src={product.image.desktop}
      />
      <h3 className="uppercase text-h5 mb-8">{product.name}</h3>
      <Link href={`/products/${product.slug}`}>
        <Button>See product</Button>
      </Link>
    </article>
  );
};

export default YouMayAlsoLikeCard;
