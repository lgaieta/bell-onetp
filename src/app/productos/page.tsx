import ProductsPage from "@/components/products/ProductsPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Productos - bell",
};

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <ProductsPage products={products} />;
}
