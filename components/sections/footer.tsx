import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import MaxWidthContainer from "./max-width-container";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="bg-dark text-white px-10 py-15 sm:py-18.5 relative">
        <MaxWidthContainer className="flex flex-col gap-12 sm:gap-8 max-w-277.5 mx-auto">
          <div className="bg-primary translate-x-30 sm:translate-x-0 h-1 w-25.25 top-0 absolute" />

          <div className="flex flex-col gap-12 sm:gap-8 xl:flex-row xl:justify-between">
            <Image
              src="/shared/desktop/logo.svg"
              className="mx-auto sm:mx-0"
              alt="logo"
              width="143"
              height="25"
            />

            <ul className="flex flex-col gap-4 text-center sm:text-start sm:flex-row sm:gap-8">
              <li>
                <Link href="/">
                  <Button className="text-white" variant="ghost">
                    home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/category/headphones">
                  <Button className="text-white" variant="ghost">
                    headphones
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/category/speakers">
                  <Button className="text-white" variant="ghost">
                    speakers
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/category/earphones">
                  <Button className="text-white" variant="ghost">
                    earphones
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <p className="opacity-50 text-center sm:text-start max-w-135">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we’re open 7 days a week.
          </p>

          <div className="flex flex-col sm:flex-row xl:flex-col-reverse gap-12 sm:justify-between w-full">
            <span className="opacity-50 text-center sm:text-start">
              Copyright 2021. All Rights Reserved
            </span>

            <ul className="flex gap-4 mx-auto sm:mx-0 xl:ms-auto items-center">
              <li>
                <Link href="#">
                  <span className="sr-only">Facebook</span>
                  <Image
                    width="24"
                    height="24"
                    alt="Facebook Link"
                    src="/shared/desktop/icon-facebook.svg"
                  />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="sr-only">Twitter</span>
                  <Image
                    width="24"
                    height="24"
                    alt="Twitter Link"
                    src="/shared/desktop/icon-twitter.svg"
                  />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="sr-only">Instagram</span>
                  <Image
                    width="24"
                    height="24"
                    alt="Instagram Link"
                    src="/shared/desktop/icon-instagram.svg"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </MaxWidthContainer>
      </div>
    </footer>
  );
};

export default Footer;
