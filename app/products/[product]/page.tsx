import type { Metadata } from "next";
import FourOFour from "@/components/sections/404";
import Categories from "@/components/sections/categories";
import ProductReview from "@/components/sections/product-review";
import ProductYouMayAlsoLike from "@/components/sections/product-you-may-also-like";
import products from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<"product", string>>;
}): Promise<Metadata> {
  const { product: productSlug } = await params;
  const selectedProduct = products.find(
    (product) => product.slug === productSlug,
  );

  if (!selectedProduct) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  const fullTitle = "Audiophile | " + selectedProduct.name;

  return {
    title: selectedProduct.name,
    description: selectedProduct.description,
    keywords: [
      selectedProduct.name,
      selectedProduct.category,
      "premium " + selectedProduct.category,
      "high-fidelity audio",
    ],
    openGraph: {
      title: fullTitle,
      description: selectedProduct.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: selectedProduct.description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<Record<"product", string>>;
}) {
  const urlParams = await params;

  const { product } = urlParams;

  if (!product) return <FourOFour />;

  const selectedProduct = products.find((p) => p.slug === product);

  if (!selectedProduct) return <FourOFour />;

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <ProductReview product={selectedProduct} />

      <ProductYouMayAlsoLike products={selectedProduct.others} />

      <Categories className="mt-40 xl:mt-50 mb-30 xl:mb-40" />
    </main>
  );
}
