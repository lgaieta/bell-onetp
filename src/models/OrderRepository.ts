import Order from "@/models/Order";

interface OrderRepository {
    create(order: Order): Promise<Order>;
}

export default OrderRepository;
