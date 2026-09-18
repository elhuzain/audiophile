import CategoryHero from "@/components/category-hero";
import ProductCard from "@/components/product-card";
import FourOFour from "@/components/sections/404";
import Categories from "@/components/sections/categories";
import CategoryProducts from "@/components/sections/category-products";

export type Product = {
    title1: string;
    title2: string;
    description: string;
    image: string;
    href: string;
    isNew?: boolean;
}

export const products: Record<string, Product[]> = {
    speakers: [
        {
            title1: "zx9",
            title2: "speaker",
            description: "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
            image: "product-zx9-speaker",
            href: "",
            isNew: true
        },
        {
            title1: "zx7",
            title2: "speaker",
            description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
            image: "product-zx7-speaker",
            href: "",
        }
    ],
    earphones: [
        {
            title1: "yx1 wireless",
            title2: "earphones",
            description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
            image: "product-yx1-earphones",
            href: "",
            isNew: true
        }
    ],
    headphones: [
        {
            title1: "x99 mark ii",
            title2: "headphones",
            description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
            image: "product-xx99-mark-two-headphones",
            href: "",
            isNew: true
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
}

export default async function Home({ params }: { params: Promise<Record<'category', string>> }) {
    const urlParams = await params;

    const { category } = urlParams;

    if (!category) return <FourOFour />;

    const selectedProducts = products[category];

    if(!selectedProducts) return <FourOFour/>;

    return (
        <main className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
            <CategoryHero category={category} />

            <CategoryProducts className="mt-30 xl:mt-40" products={selectedProducts} />

            <Categories className="mt-40 xl:mt-50 mb-30 xl:mb-40" />
        </main>
    );
}
