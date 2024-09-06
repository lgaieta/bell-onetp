"use client";

import Product from "@/models/Product";
import CartSummary from "@/components/cart/CartSummary";
import { useEffect, useState } from "react";
import CartProducts from "@/components/cart/CartProducts";
import { editCartProducts } from "@/services/actions/editCartProducts";

export type ProductsListWithAmount = (Product & { amount: number })[];

type CartPageProps = {
    products: ProductsListWithAmount;
};

function CartPage(props: CartPageProps) {
    const [products, setProducts] = useState(props.products);

    useEffect(() => {
        const updateCookies = async () => await editCartProducts(products);
        updateCookies();
    }, [products]);

    const handleProductsChange = async (newList: ProductsListWithAmount) => {
        setProducts(newList);
    };

    return (
        <main className="flex w-full flex-col gap-16 items-center py-16 container">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Carrito de compras
                </h1>
            </header>
            <div className="grid w-full gap-10 grid-cols-1 md:grid-cols-3 sm:flex-row sm:justify-between">
                <CartSummary products={products} />
                <CartProducts
                    products={products}
                    onProductsChange={handleProductsChange}
                />
            </div>
        </main>
    );
}

export default CartPage;
