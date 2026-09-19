import { ChevronRight } from "lucide-react";
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
          alt={`${title} category`}
          src={`/shared/desktop/image-category-thumbnail-${title}.png`}
        />
      </div>
      <h2 className="text-h6 uppercase mb-2">{title}</h2>
      <span className="inline-flex items-center gap-1 text-[13px] font-bold tracking-[1px] uppercase text-black/50 group-hover:text-primary">
        shop
        <ChevronRight className="size-4 text-primary" />
      </span>
    </Link>
  );
};

export default CategoryCard;
