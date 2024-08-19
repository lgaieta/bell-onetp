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

    return <ProductsPage products={products} />;
}
