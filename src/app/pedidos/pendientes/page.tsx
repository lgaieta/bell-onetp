import PendingOrdersClientPage from "@/components/PendingOrdersClientPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <PendingOrdersClientPage products={products} />;
}
