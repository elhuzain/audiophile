import Categories from "@/components/sections/categories";
import FeaturedProducts from "@/components/sections/featured-products";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <Hero />

      <Categories className="mt-26 md:mt-40 mb-30 md:mb-24" />

      <FeaturedProducts className="mb-30 sm:mb-24 xl:mb-50" />
    </main>
  );
}
