import OrderDetailsPage from "@/components/order-details/OrderDetailsPage";
import OrderRepository from "@/models/OrderRepository";
import ProductRepository from "@/models/ProductRepository";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { OrderIdSchema } from "@/services/OrderSchema";

export default async function Page({ params }: { params: { id: string } }) {
    const validatedId = OrderIdSchema.parse(+params.id);

    const orderRepository: OrderRepository = new MySQLOrderRepository();
    const order = await orderRepository.getById(validatedId);
    const products = await orderRepository.getProducts(validatedId);

    return <OrderDetailsPage order={order} products={products} />;
}
