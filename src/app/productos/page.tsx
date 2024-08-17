import ProductsPage from "@/components/ProductsPage";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { cookies } from "next/headers";

export const CART_COOKIE_NAME = "cart";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    async function handleAddToCart(id: Product["id"], formData: FormData) {
        "use server";
        const productsIds = JSON.parse(
            cookies().get(CART_COOKIE_NAME)?.value || "[]",
        );
        cookies().set(CART_COOKIE_NAME, JSON.stringify([...productsIds, id]));
    }

    return (
        <ProductsPage products={products} onAddToCardClick={handleAddToCart} />
    );
}
