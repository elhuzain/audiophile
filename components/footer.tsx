import Image from "next/image";
import Link from "next/link";
import Button from "./ui/button";
import MaxWidthContainer from "./max-width-container";

const Footer = () => {
    return <footer className="flex flex-col">
        <MaxWidthContainer>
            <article className="grid grid-cols-1 mx-auto xl:grid-cols-[1fr_1fr] xl:justify-between xl:gap-0 gap-10 mb-30 sm:mb-24 xl:mb-50">
                <Image src="/shared/mobile/image-best-gear.jpg" className="sm:hidden w-full rounded-lg" alt="Best gear" width="327" height="300" />
                <Image src="/shared/tablet/image-best-gear.jpg" className="hidden sm:block xl:hidden w-full rounded-lg" alt="Best gear" width="689" height="300" />
                <Image src="/shared/desktop/image-best-gear.jpg" className="order-[1] hidden xl:block w-full rounded-lg" alt="Best gear" width="540" height="588" />
                <div className="text-center flex flex-col items-center justify-center xl:items-start xl:text-start">
                    <h2 className="text-h5 sm:text-h3 uppercase mb-8 xl:mb-6 max-w-61 sm:max-w-90 tracking-[1.43px] xl:max-w-78 text-center">Bringing you the <span className="text-primary">best</span> audio gear</h2>
                    <p className="opacity-50 xl:max-w-110">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
                </div>
            </article>
        </MaxWidthContainer>
        <div className="bg-dark text-white px-10 py-15 sm:py-18.5 relative">

            <MaxWidthContainer className="flex flex-col gap-12 sm:gap-8 max-w-277.5 mx-auto">
                <div className="bg-primary translate-x-30 sm:translate-x-0 h-1 w-25.25 top-0 absolute" />

                <div className="flex flex-col gap-12 sm:gap-8 xl:flex-row xl:justify-between">
                    <Image src="/shared/desktop/logo.svg" className="mx-auto sm:mx-0" alt="logo" width="143" height="25" />

                    <ul className="flex flex-col gap-4 text-center sm:text-start sm:flex-row sm:gap-8">
                        <li>
                            <Link href="/"><Button className="text-white" variant="ghost">home</Button></Link>
                        </li>
                        <li>
                            <Link href="/headphones"><Button className="text-white" variant="ghost">headphones</Button></Link>
                        </li>
                        <li>
                            <Link href="/speakers"><Button className="text-white" variant="ghost">speakers</Button></Link>
                        </li>
                        <li>
                            <Link href="/earphones"><Button className="text-white" variant="ghost">earphones</Button></Link>
                        </li>
                    </ul>
                </div>

                <p className="opacity-50 text-center sm:text-start max-w-135">
                    Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                </p>

                <div className="flex flex-col sm:flex-row xl:flex-col-reverse gap-12 sm:justify-between w-full">
                    <span className="opacity-50 text-center sm:text-start">Copyright 2021. All Rights Reserved</span>

                    <ul className="flex gap-4 mx-auto sm:mx-0 xl:ms-auto items-center">
                        <li>
                            <Link href="#">
                                <span className="sr-only">Facebook</span>
                                <Image width="24" height="24" alt="Facebook Link" src="/shared/desktop/icon-facebook.svg" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <span className="sr-only">Twitter</span>
                                <Image width="24" height="24" alt="Twitter Link" src="/shared/desktop/icon-twitter.svg" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <span className="sr-only">Instagram</span>
                                <Image width="24" height="24" alt="Instagram Link" src="/shared/desktop/icon-instagram.svg" />
                            </Link>
                        </li>
                    </ul>
                </div>

            </MaxWidthContainer>

        </div>
    </footer>
}

export default Footer;