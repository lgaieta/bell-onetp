import { CART_COOKIE_NAME } from "@/app/productos/page";
import CartPage from "@/components/CartPage";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Page() {
    const cartProductsIdsStrings = JSON.parse(
        cookies().get(CART_COOKIE_NAME)?.value || "[]",
    );

    if (cartProductsIdsStrings.length < 1)
        return (
            <CartPage
                productsList={[]}
                onRemoveProductFromCart={handleRemoveProductFromCart}
            />
        );

    const cartProductsIds = cartProductsIdsStrings.map((e: string) =>
        Number(e),
    );
    const productRepository = new MySQLProductRepository();
    const productsList = await productRepository.getByIdList(cartProductsIds);

    async function handleRemoveProductFromCart(id: Product["id"], _: FormData) {
        "use server";
        const productsIds = JSON.parse(
            cookies().get(CART_COOKIE_NAME)?.value || "[]",
        );

        cookies().set(
            CART_COOKIE_NAME,
            JSON.stringify(
                productsIds.filter((itemId: number) => itemId !== id),
            ),
        );

        revalidatePath("/carrito");
    }

    return (
        <CartPage
            productsList={productsList}
            onRemoveProductFromCart={handleRemoveProductFromCart}
        />
    );
}
