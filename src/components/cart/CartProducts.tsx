import CartProductsRemoveButton from "@/components/cart/CartProductsRemoveButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductItem from "@/components/ui/product-item";
import Product from "@/models/Product";
import { Link } from "lucide-react";

type CartProductsProps = {
    productsList: Product[];
};

function CartProducts(props: CartProductsProps) {
    return (
        <Card className="flex justify-center w-full rounded-xl bg-muted/40 md:col-span-2 p-6 md:p-16">
            {props.productsList.length > 0 ? (
                <div className="flex flex-col gap-6 w-full">
                    {props.productsList.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            endContent={
                                <CartProductsRemoveButton
                                    productId={product.id}
                                />
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-8 justify-center items-center w-full text-center">
                    <p>Parece que no hay ningun producto en tu carrito.</p>
                    <Button asChild>
                        <Link href="/productos">Ir a productos</Link>
                    </Button>
                </div>
            )}
        </Card>
    );
}

export default CartProducts;
