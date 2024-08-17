import { CART_COOKIE_NAME } from "@/app/productos/page";
import CartPage from "@/components/CartPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { cookies } from "next/headers";

export default async function Page() {
    const cartProductsIdsStrings = JSON.parse(
        cookies().get(CART_COOKIE_NAME)?.value || "[]",
    );
    const cartProductsIds = cartProductsIdsStrings.map((e: string) =>
        Number(e),
    );
    const productRepository = new MySQLProductRepository();
    const productsList = await productRepository.getByIdList(cartProductsIds);

    return <CartPage productsList={productsList} />;
}
