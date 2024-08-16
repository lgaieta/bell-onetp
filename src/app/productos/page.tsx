import ProductsPage from "@/components/ProductsPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <ProductsPage products={products} />;
}
