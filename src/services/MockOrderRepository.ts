import Order from "@/models/Order";
import OrderRepository from "@/models/OrderRepository";

class MockOrderRepository implements OrderRepository {
    private orders: Order[] = [];

    async create(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }
}

export default MockOrderRepository;
