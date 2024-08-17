import { MdAddShoppingCart } from "react-icons/md";
import Product from "@/models/Product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductsPageProps = {
    products: Product[];
    onAddToCardClick: (id: Product["id"], formData: FormData) => void;
};

async function ProductsPage(props: ProductsPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Productos</h1>
            </header>
            <ul className="flex flex-col w-full gap-10 px-4 md:max-w-4xl">
                {props.products.map((item) => (
                    <Card
                        key={item.id}
                        className="rounded-2xl hover:bg-muted/20 transition-colors"
                    >
                        <CardContent className="flex flex-col min-[400px]:flex-row justify-between items-center gap-6 min-[400px]:gap-2 p-10">
                            <li className="flex flex-col gap-1 w-full">
                                <p className="text-lg font-bold">{item.name}</p>
                                <p className="text-muted-foreground">
                                    {item.description}
                                </p>
                            </li>
                            <form>
                                <Button
                                    type="submit"
                                    formAction={props.onAddToCardClick.bind(
                                        null,
                                        item.id,
                                    )}
                                    size="icon"
                                    variant="outline"
                                >
                                    <MdAddShoppingCart size={24} />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ))}
            </ul>
        </main>
    );
}
export default ProductsPage;
