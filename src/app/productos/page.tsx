import ProductsPage from "@/components/ProductsPage";
import { CART_COOKIE_NAME } from "@/lib/constants";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Productos - bell",
};

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    async function handleAddToCart(id: Product["id"], formData: FormData) {
        "use server";
        const productsIds = JSON.parse(
            cookies().get(CART_COOKIE_NAME)?.value || "[]",
        );
        const validatedId = ProductIdSchema.parse(id);
        cookies().set(
            CART_COOKIE_NAME,
            JSON.stringify([...productsIds, validatedId]),
        );
    }

    return (
        <ProductsPage products={products} onAddToCardClick={handleAddToCart} />
    );
}
