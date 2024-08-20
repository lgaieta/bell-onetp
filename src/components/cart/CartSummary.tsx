import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Product from "@/models/Product";

function CartSummary({ productsList }: { productsList: Product[] }) {
    return (
        <div className="flex flex-col rounded-md w-full">
            <Card className="rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl">Resumen</CardTitle>
                </CardHeader>
                <CardContent>
                    {productsList.length > 0 ? (
                        productsList.map((product) => (
                            <div
                                className="flex justify-between w-full"
                                key={product.name}
                            >
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">
                            Agrega al menos un producto a tu carrito de compras
                            para comenzar.
                        </p>
                    )}
                    {productsList.length > 0 && (
                        <div className="flex justify-between w-full pt-4">
                            <p>Total</p>
                            <p>
                                $
                                {productsList.reduce(
                                    (acc, el) => acc + +el.price,
                                    0,
                                )}
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        className="w-full"
                        size="lg"
                        disabled={productsList.length < 1}
                    >
                        Comenzar la compra
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CartSummary;
