import EditPendingOrderPage from "@/components/EditPendingOrderPage";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const OrderRepository = new MySQLProductRepository();
    const order = await OrderRepository.getList();

    return <EditPendingOrderPage order={order} />;
}
