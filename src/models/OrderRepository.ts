import Order from "@/models/Order";
import User from "@/models/User";

interface OrderRepository {
    create(order: Order): Promise<Order>;
    delete(id: Order["id"]): Promise<void>
    getByUsername(username: User["username"]): Promise<Order[]>;
}

export default OrderRepository;
