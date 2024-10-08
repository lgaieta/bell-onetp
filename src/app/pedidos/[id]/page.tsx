import OrderDetailsPage from "@/components/order-details/OrderDetailsPage";
import OrderRepository from "@/models/OrderRepository";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import { OrderIdSchema } from "@/services/schemas/OrderSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Detalles de pedido - bell",
};

export default async function Page({ params }: { params: { id: string } }) {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const validatedId = OrderIdSchema.parse(+params.id);

    const orderRepository: OrderRepository = new MySQLOrderRepository();
    const order = await orderRepository.getById(validatedId);
    const products = await orderRepository.getProducts(validatedId);

    return <OrderDetailsPage order={order} products={products} />;
}
