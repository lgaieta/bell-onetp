import OrdersAdminPage from "@/components/orders-admin/OrdersAdminPage";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";

export default async function Page() {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getList();

    return <OrdersAdminPage orders={orders} />;
}
