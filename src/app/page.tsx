import HomePage from "@/components/HomePage";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <HomePage products={products} />;
}
