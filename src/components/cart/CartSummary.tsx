import { ProductsListWithAmount } from "@/components/cart/CartPage";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Product from "@/models/Product";

function CartSummary({ products }: { products: ProductsListWithAmount }) {
    return (
        <div className="flex flex-col rounded-md w-full">
            <Card className="rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                className="flex justify-between items-start w-full"
                                key={product.name}
                            >
                                <p>{product.name}</p>
                                <div className="flex flex-col items-end gap-1">
                                    <p>${product.price * product.amount}</p>
                                    <p className="text-muted-foreground">
                                        Unidades: {product.amount}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">
                            Agrega al menos un producto a tu carrito de compras
                            para comenzar.
                        </p>
                    )}
                    {products.length > 0 && (
                        <div className="flex justify-between w-full pt-4">
                            <p>Total</p>
                            <p>
                                $
                                {products.reduce(
                                    (acc, el) => acc + +el.price * el.amount,
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
                        disabled={products.length < 1}
                    >
                        Comenzar la compra
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CartSummary;
