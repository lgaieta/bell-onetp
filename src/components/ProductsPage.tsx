import { MdAddShoppingCart } from "react-icons/md";
import Product from "@/models/Product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductsPageProps = {
    products: Product[];
};

async function ProductsPage(props: ProductsPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Productos</h1>
            </header>
            <div className="flex flex-col w-full gap-6 px-4 md:max-w-4xl">
                {props.products.map((item) => (
                    <Card
                        key={item.id}
                        className="rounded-2xl hover:bg-muted transition-colors"
                    >
                        <CardContent className="flex justify-between items-center p-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-bold">{item.name}</p>
                                <p className="text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                            <Button size="icon" variant="outline">
                                <MdAddShoppingCart size={24} />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
export default ProductsPage;
