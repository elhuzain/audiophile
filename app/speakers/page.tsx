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
    title1: "zx9",
    title2: "speaker",
    description: "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    image: "product-zx9-speaker",
    href: ""
  },
  {
    title1: "zx7",
    title2: "speaker",
    description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    image: "product-zx7-speaker",
    href: "",
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
