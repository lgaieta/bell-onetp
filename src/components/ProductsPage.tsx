import { MdAddShoppingCart } from "react-icons/md";
import Product from "@/models/Product";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/ui/product-item";

type ProductsPageProps = {
    products: Product[];
    onAddToCardClick: (id: Product["id"], formData: FormData) => void;
};

async function ProductsPage(props: ProductsPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl text-center">
                    Productos
                </h1>
            </header>
            <ul className="flex flex-col w-full gap-10 px-4 md:max-w-4xl">
                {props.products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        endContent={
                            <form className="flex gap-4 items-center">
                                <p className="text-lg font-bold">
                                    ${product.price}
                                </p>
                                <Button
                                    type="submit"
                                    formAction={props.onAddToCardClick.bind(
                                        null,
                                        product.id,
                                    )}
                                    size="icon"
                                    variant="outline"
                                >
                                    <MdAddShoppingCart size={24} />
                                </Button>
                            </form>
                        }
                    />
                ))}
            </ul>
        </main>
    );
}
export default ProductsPage;
