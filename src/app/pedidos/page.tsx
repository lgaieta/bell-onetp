import OrdersAdminPage from "@/components/orders-admin/OrdersAdminPage";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Pedidos - bell",
};

export default async function Page() {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getList();

    return <OrdersAdminPage orders={orders} />;
}
