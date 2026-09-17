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
    title1: "x99 mark ii",
    title2: "headphones",
    description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    image: "product-xx99-mark-two-headphones",
    href: ""
  },
  {
    title1: "x99 mark i",
    title2: "headphones",
    description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    image: "product-xx99-mark-one-headphones",
    href: "",
  },
  {
    title1: "XX59",
    title2: "Headphones",
    description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    image: "product-xx59-headphones",
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
