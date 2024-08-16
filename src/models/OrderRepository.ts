import Order from "@/models/Order";
import User from "@/models/User";

interface OrderRepository {
    create(order: Order): Promise<Order>;
    delete(id: Order["id"]): Promise<void>;
    update(newOrder: Order): Promise<Order>;
    getByUsername(username: User["username"]): Promise<Order[]>;
    getById(id: Order["id"]): Promise<Order>;
    getList(): Promise<Order[]>
}

export default OrderRepository;
