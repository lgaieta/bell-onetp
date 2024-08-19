import OrdersClientPage from "@/components/OrdersClientPage";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";

export default async function Page() {
    const { isAuth, username, type } = await SessionManager.verifySession();
    if (!isAuth || type === SessionType.Admin) redirect("/productos");
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getByUsername(username!);

    return <OrdersClientPage orders={orders} />;
}
