import { ProductsListWithAmount } from "@/components/cart/CartPage";
import CartProductAmountSelector from "@/components/cart/CartProductAmountSelector";
import CartProductsRemoveButton from "@/components/cart/CartProductsRemoveButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductItem from "@/components/ui/product-item";
import Product from "@/models/Product";
import Link from "next/link";

type CartProductsProps = {
    products: ProductsListWithAmount;
    onProductsChange: (newProducts: ProductsListWithAmount) => Promise<void>;
};

function CartProducts(props: CartProductsProps) {
    const handleAmountChange = (id: Product["id"], newAmount: number) => {
        const idList = props.products.map((p) => p.id);
        const indexOfNewAmount = idList.indexOf(id);
        const newProducts = [...props.products];
        newProducts[indexOfNewAmount].amount = newAmount;
        console.log(newProducts);
        props.onProductsChange(newProducts);
    };

    return (
        <Card className="flex justify-center w-full rounded-xl bg-muted/40 md:col-span-2 p-6 md:p-16">
            {props.products.length > 0 ? (
                <div className="flex flex-col gap-6 w-full">
                    {props.products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            endContent={
                                <div className="flex gap-3">
                                    <CartProductAmountSelector
                                        amount={product.amount}
                                        onAmountChange={(newAmount) =>
                                            handleAmountChange(
                                                product.id,
                                                newAmount,
                                            )
                                        }
                                    />
                                    <CartProductsRemoveButton
                                        productId={product.id}
                                    />
                                </div>
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
