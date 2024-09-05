import OrdersClientPage from "@/components/OrdersClientPage";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Mis compras - bell",
    description:
        "Las compras que se realizaron en esta cuenta, cada una muestra el total y los productos que se usaron.",
};

export default async function Page() {
    const { isAuth, username, type } = await SessionManager.verifySession();
    if (!isAuth || type === SessionType.Admin) redirect("/productos");
    const orderRepository = new MySQLOrderRepository();
    const orders = await orderRepository.getByUsername(username!);

    return <OrdersClientPage orders={orders} />;
}
