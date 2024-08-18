import PendingOrdersPage from "@/components/PendingOrdersPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <PendingOrdersPage products={products} />;
}
