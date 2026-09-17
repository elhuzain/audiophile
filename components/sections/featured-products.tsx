import Image from "next/image";
import Button from "../ui/button";
import MaxWidthContainer from "../max-width-container";

const FeaturedProducts = () => {
    return <MaxWidthContainer>
        <section className="w-full space-y-6 sm:space-y-8 xl:space-y-12">
            <article className="relative rounded-lg w-full xl:gap-25 overflow-hidden bg-primary text-white flex flex-col xl:flex-row items-center justify-center py-16">
                <div className="flex flex-col justify-center items-center">
                    <div className="absolute size-150 -translate-y-35 sm:-translate-y-30 sm:size-180 xl:translate-y-85 xl:size-250 bottom-0 aspect-square">
                        <Image src="/home/desktop/pattern-circles.svg" className="object-cover" fill alt="pattern" />
                    </div>
                    <div className="aspect-square -translate-y-5 sm:translate-y-0 relative size-50 xl:size-125 xl:translate-y-20 mb-4 sm:mb-10 xl:mb-0">
                        <Image src="/home/desktop/image-speaker-zx9.png" className="object-contain" fill alt="zx9 speaker" />
                    </div>
                </div>
                <div className="text-center xl:text-start">
                    <h2 className="text-h2 xl:text-h1 uppercase font-bold mb-4 xl:mb-6">zx9<br />speaker</h2>
                    <p className="max-w-87.5 mb-4 sm:mb-10">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
                    <Button className="bg-black hover:bg-black/60">see product</Button>
                </div>
            </article>

            <article className="relative flex flex-col overflow-hidden object-contain aspect-square sm:h-80 sm:w-full sm:aspect-auto rounded-lg bg-light px-6 sm:px-16 xl:px-24 py-10">
                <div className="relative z-10 my-auto">
                    <h2 className="text-h4 uppercase mb-8">zx7 speaker</h2>
                    <Button variant="secondary">see product</Button>
                </div>
                <Image className="z-0 sm:hidden" fill alt="zx7 speaker" src="/home/mobile/image-speaker-zx7.jpg" />
                <Image className="z-0 object-cover hidden sm:block xl:hidden w-full h-full" fill alt="zx7 speaker" src="/home/tablet/image-speaker-zx7.jpg" />
                <Image className="z-0 object-cover hidden xl:block w-full h-full" fill alt="zx7 speaker" src="/home/desktop/image-speaker-zx7.jpg" />
            </article>

            <article className="grid grid-cols-1 sm:grid-cols-2 sm:flex-row gap-6 sm:gap-2.5">
                <Image width="327" height="200" alt="yx1 earphones" className="rounded-lg w-full sm:hidden" src="/home/mobile/image-earphones-yx1.jpg" />
                <Image width="339" height="320" alt="yx1 earphones" className="rounded-lg hidden w-full sm:block xl:hidden" src="/home/tablet/image-earphones-yx1.jpg" />
                <Image width="540" height="320" alt="yx1 earphones" className="rounded-lg w-full hidden xl:block" src="/home/desktop/image-earphones-yx1.jpg" />
                <div className="bg-light flex justify-center flex-col rounded-lg px-6 py-10 w-full sm:px-10 sm:py-25 xl:px-24">
                    <h2 className="text-h4 uppercase mb-8">yx1 earphones</h2>
                    <Button variant="secondary" className="w-fit">see product</Button>
                </div>
            </article>
        </section>
    </MaxWidthContainer>
}

export default FeaturedProducts;
