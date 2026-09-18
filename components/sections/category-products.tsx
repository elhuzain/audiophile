import { Product } from "@/app/category/[category]/page";
import ProductCard from "../product-card";
import { cn } from "@/lib/utils";

const CategoryProducts = ({
    className,
    products
}: {
    className?: string
    products: Product[]
}) => {
    return <ul className={cn("space-y-30 xl:space-y-40", className)}>
        {
            products.map((product, index) => <li className="w-full" key={index}>
                <ProductCard {...product} isReversed={index % 2 !== 0} />
            </li>)
        }
    </ul>
}

export default CategoryProducts;