import { cn } from "@/lib/utils";
import CategoryCard from "../category-card";
import MaxWidthContainer from "../max-width-container"

const Categories = ({
    className = ""
}: {
    className?: string
}) => {
    return <MaxWidthContainer className={cn("", className)}>
        <section className="flex flex-col md:flex-row gap-16 md:gap-2.5 xl:gap-7.5">
            <CategoryCard title="headphones" href="" />
            <CategoryCard title="speakers" href="" />
            <CategoryCard title="earphones" href="" />
        </section>
    </MaxWidthContainer>
}

export default Categories;
