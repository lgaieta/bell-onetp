import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ProductItem from "@/components/ui/product-item";
import Product from "@/models/Product";

type OrderProductsCardProps = {
    productAmounts: {
        [index: Product["id"]]: number;
    };
    products: Product[];
};

function OrderProductsCard(props: OrderProductsCardProps) {
    return (
        <Card className="flex flex-col gap-8 justify-center w-full rounded-xl bg-muted/40 md:col-span-2 p-6 md:p-10">
            <CardHeader className="p-0">
                <CardTitle>Productos incluidos</CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-6 w-full">
                {props.products.map((product) => (
                    <ProductItem
                        product={product}
                        endContent={
                            <div className="flex flex-col gap-2 items-end justify-center">
                                <p>${product.price}</p>
                                <p className="w-fit text-nowrap">
                                    Unidades: {props.productAmounts[product.id]}
                                </p>
                            </div>
                        }
                    />
                ))}
            </div>
        </Card>
    );
}

export default OrderProductsCard;
