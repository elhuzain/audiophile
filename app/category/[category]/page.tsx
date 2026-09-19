import type { Metadata } from "next";
import CategoryHero from "@/components/sections/category-hero";
import FourOFour from "@/components/sections/404";
import Categories from "@/components/sections/categories";
import CategoryProducts from "@/components/sections/category-products";
import { getProductsByCategory, type ProductCategory } from "@/lib/data";

const categoryDescriptions: Record<ProductCategory, string> = {
  headphones:
    "Explore Audiophile premium headphones, designed for detailed, immersive listening at home, in the studio, or on the move.",
  speakers:
    "Discover Audiophile speakers built to deliver powerful, precise sound for exceptional home and studio listening.",
  earphones:
    "Shop Audiophile wireless earphones combining high-fidelity sound, comfort, and effortless everyday portability.",
};

const isProductCategory = (category: string): category is ProductCategory =>
  category in categoryDescriptions;

const formatCategoryName = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<"category", string>>;
}): Promise<Metadata> {
  const { category } = await params;

  if (!isProductCategory(category)) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  const categoryName = formatCategoryName(category);
  const description = categoryDescriptions[category];
  const fullTitle = "Audiophile | " + categoryName;

  return {
    title: categoryName,
    description,
    keywords: [category, "premium " + category, "audiophile " + category],
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Record<"category", string>>;
}) {
  const { category } = await params;

  if (!isProductCategory(category)) return <FourOFour />;

  const selectedProducts = getProductsByCategory(category);

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <CategoryHero category={category} />

      <CategoryProducts
        className="mt-30 xl:mt-40"
        products={selectedProducts}
      />

      <Categories className="mt-40 xl:mt-50 mb-30 xl:mb-40" />
    </main>
  );
}
