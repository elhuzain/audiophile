import CategoryCard from "@/components/category-card";
import Categories from "@/components/sections/categories";
import FeaturedProducts from "@/components/sections/featured-products";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <Hero />

      <Categories />

      <FeaturedProducts />
    </main>
  );
}
