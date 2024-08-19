import CartPage from "@/components/CartPage";
import { CART_COOKIE_NAME } from "@/lib/constants";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
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

    const productRepository = new MySQLProductRepository();
    const productsList = await productRepository.getByIdList(
        cartProductsIdsStrings,
    );

    async function handleRemoveProductFromCart(id: Product["id"], _: FormData) {
        "use server";
        const productsIds = JSON.parse(
            cookies().get(CART_COOKIE_NAME)?.value || "[]",
        );

        const validatedId = ProductIdSchema.parse(id);

        cookies().set(
            CART_COOKIE_NAME,
            JSON.stringify(
                productsIds.filter((itemId: string) => itemId !== validatedId),
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
