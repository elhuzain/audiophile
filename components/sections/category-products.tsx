import type { DetailedProduct } from "@/lib/data";
import { cn } from "@/lib/utils";
import ProductCard from "../product-card";

const CategoryProducts = ({
  className,
  products,
}: {
  className?: string;
  products: DetailedProduct[];
}) => {
  return (
    <ul className={cn("space-y-30 xl:space-y-40", className)}>
      {products.map((product, index) => (
        <li className="w-full" key={product.id}>
          <ProductCard product={product} isReversed={index % 2 !== 0} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryProducts;
