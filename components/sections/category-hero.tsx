import MaxWidthContainer from "./max-width-container";

const CategoryHero = ({ category }: { category: string }) => {
  return (
    <section className="bg-dark w-full">
      <MaxWidthContainer className="pt-26 pb-8 sm:pb-20 sm:pt-40 w-full flex items-center justify-center">
        <h1 className="text-h2 sm:text-h1 text-white uppercase">{category}</h1>
      </MaxWidthContainer>
    </section>
  );
};

export default CategoryHero;
