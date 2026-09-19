import { ChevronRight } from "lucide-react";
import Button from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className="flex group rounded-lg w-full p-6 pt-22 xl:pt-26 bg-light items-center relative justify-center flex-col text-center"
    >
      <div className="aspect-square top-0 translate-y-[-32%] absolute size-36 xl:size-40">
        <Image
          className="object-cover"
          fill
          alt="Headphones"
          src={`/shared/desktop/image-category-thumbnail-${title}.png`}
        />
      </div>
      <h2 className="text-h6 uppercase mb-2">{title}</h2>
      <Button variant="ghost">
        <span className="group-hover:text-primary">shop</span>
        <ChevronRight className="text-primary" />
      </Button>
    </Link>
  );
};

export default CategoryCard;
