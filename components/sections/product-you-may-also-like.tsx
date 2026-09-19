import MaxWidthContainer from "../max-width-container"
import YouMayAlsoLikeCard from "../you-may-also-like-card"

const ProductYouMayAlsoLike = ({ products }: {
    products: {
        slug: string,
        name: string,
        image: {
            mobile: string,
            tablet: string,
            desktop: string
        }
    }[]
}) => {
    return <MaxWidthContainer>
        <section className="pt-30">
            <h2 className="mb- uppercase text-h5 sm:text-h2 lg:text-h3 text-center mb-14 lg:mb-16">You may also like</h2>
            <ul className="flex flex-col gap-14 sm:gap-2.75 lg:gap-7.5 sm:flex-row">
                {
                    products.map((product, index) => <li className="w-full" key={index}> <YouMayAlsoLikeCard product={product} /> </li>)
                }
            </ul>
        </section>
    </MaxWidthContainer>
}

export default ProductYouMayAlsoLike