import CartPage from "@/components/cart/CartPage";
import { CART_COOKIE_NAME } from "@/lib/constants";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Carrito de compras - bell",
    description:
        "Carrito de compras donde se encuentran los productos elegidos para ser comprados.",
};

export default async function Page() {
    const savedCartProducts = JSON.parse(
        cookies().get(CART_COOKIE_NAME)?.value || "{}",
    );

    if (Object.keys(savedCartProducts).length < 1)
        return <CartPage products={[]} />;

    const productRepository = new MySQLProductRepository();
    const productsList = await productRepository.getByIdList(
        Object.keys(savedCartProducts),
    );

    const products = productsList.map((product) => ({
        ...product,
        amount: savedCartProducts[product.id],
    }));

    return <CartPage products={products} />;
}
