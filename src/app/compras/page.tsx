import OrdersClientPage from "@/components/OrdersClientPage";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export default async function Page() {
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getByUsername("username");

    return <OrdersClientPage orders={orders} />;
}
