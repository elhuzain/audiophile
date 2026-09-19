import FourOFour from "@/components/sections/404";
import Categories from "@/components/sections/categories";
import ProductReview from "@/components/sections/product-review";
import ProductYouMayAlsoLike from "@/components/sections/product-you-may-also-like";
import products from "@/lib/data";

export default async function Home({ params }: { params: Promise<Record<'product', string>> }) {
    const urlParams = await params;

    const { product } = urlParams;

    if (!product) return <FourOFour />;

    const selectedProduct = products.find(p => p.slug === product);

    if (!selectedProduct) return <FourOFour />;

    return (
        <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
            <ProductReview product={selectedProduct} />

            <ProductYouMayAlsoLike products={selectedProduct.others} />

            <Categories className="mt-40 xl:mt-50 mb-30 xl:mb-40" />
        </main>
    );
}
