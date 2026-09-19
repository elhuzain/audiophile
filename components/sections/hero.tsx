import Image from "next/image";
import Button from "../ui/button";
import MaxWidthContainer from "./max-width-container";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#181818] xl:max-h-205 relative h-dvh text-white flex w-full items-center justify-center">
      <MaxWidthContainer className="h-fit text-center xl:text-start max-w-277.5 w-full">
        <div className="z-10 relative">
          <span className="uppercase text-overline opacity-50 mb-4 sm:mb-6 block">
            new product
          </span>
          <h1 className="uppercase mb-6 text-h2 sm:text-h1">
            xx99 mark ii
            <br />
            headphones
          </h1>
          <p className="opacity-50 font-medium mx-auto xl:mx-0 mb-10 max-w-77.5 sm:max-w-92">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link href="/products/xx99-mark-two-headphones">
            <Button>See product</Button>
          </Link>
        </div>
        <Image
          alt="hero"
          className="object-cover sm:hidden"
          fill
          src="/home/mobile/image-header.jpg"
        />
        <Image
          alt="hero"
          className="object-cover hidden sm:block xl:hidden"
          fill
          src="/home/tablet/image-header.jpg"
        />
        <Image
          alt="hero"
          className="object-contain hidden xl:block scale-80 opacity-80"
          fill
          src="/home/desktop/image-hero.jpg"
        />
      </MaxWidthContainer>
    </section>
  );
};

export default Hero;
