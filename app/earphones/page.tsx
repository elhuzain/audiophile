import CategoryHero from "@/components/category-hero";
import ProductCard from "@/components/product-card";
import Categories from "@/components/sections/categories";
import CategoryProducts from "@/components/sections/category-products";

export type Product = {
  title1: string;
  title2: string;
  description: string;
  image: string;
  href: string;
}

export const products: Product[] = [
  {
    title1: "yx1 wireless",
    title2: "earphones",
    description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    image: "product-yx1-earphones",
    href: ""
  }
]

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <CategoryHero />

      <CategoryProducts className="mt-30 xl:mt-40" products={products} />

      <Categories className="mt-40 xl:mt-50 mb-30 xl:mb-40"  />
    </main>
  );
}
