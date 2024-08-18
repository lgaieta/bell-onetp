import OrderDetailsPage from "@/components/OrderDetailsPage";
import OrderRepository from "@/models/OrderRepository";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import { OrderIdSchema } from "@/services/OrderSchema";

export default async function Page({ params }: { params: { id: string } }) {
    const validatedId = OrderIdSchema.parse(+params.id);

    const orderRepository: OrderRepository = new MySQLOrderRepository();
    const order = await orderRepository.getById(validatedId);

    return <OrderDetailsPage order={order} />;
}
