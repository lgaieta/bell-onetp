import OrdersAdminPage from "@/components/orders-admin/OrdersAdminPage";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";

export default async function Page() {
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getList();

    return <OrdersAdminPage orders={orders} />;
}
