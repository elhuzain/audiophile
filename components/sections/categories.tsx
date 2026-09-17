import CategoryCard from "../category-card";
import MaxWidthContainer from "../max-width-container"

const Categories = () => {
    return <MaxWidthContainer className="my-4 mt-26 md:mt-40 mb-30 md:mb-24">
        <section className="flex flex-col md:flex-row gap-16 md:gap-2.5 xl:gap-7.5">
            <CategoryCard title="headphones" href="" />
            <CategoryCard title="speakers" href="" />
            <CategoryCard title="earphones" href="" />
        </section>
    </MaxWidthContainer>
}

export default Categories;