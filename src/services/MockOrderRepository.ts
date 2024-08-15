import ApiStrings from "@/app/api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import Order from "@/models/Order";
import OrderRepository from "@/models/OrderRepository";
import OrderState from "@/models/OrderState";
import User from "@/models/User";

const mockOrders: Order[] = [
    {
        id: 1,
        username: "user123",
        totalPrice: 99.99,
        operationState: OrderState.Pending,
        creationTime: new Date("2024-08-14T00:00:00Z"),
        products: [1, 2, 3],
    },
    {
        id: 2,
        username: "user456",
        totalPrice: 149.99,
        operationState: OrderState.Shipped,
        creationTime: new Date("2024-08-15T00:00:00Z"),
        products: [4, 5],
    },
];

class MockOrderRepository implements OrderRepository {
    private orders: Order[] = mockOrders;

    async create(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }

    async getByUsername(username: User["username"]): Promise<Order[]> {
        const order = this.orders.filter(
            (order) => order.username === username,
        );
        if (order.length === 0)
            throw new NotFoundError(ApiStrings.orderNotFoundMessage);
        return order;
    }

    async delete(id: Order["id"]): Promise<void> {
        const order = this.orders.find((order) => order.id === id);
        if (order === undefined)
            throw new NotFoundError(ApiStrings.orderNotFoundMessage);
    }
}

export default MockOrderRepository;
