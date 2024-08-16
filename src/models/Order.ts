import OrderState from "@/models/OrderState";
import Product from "@/models/Product";
import User from "@/models/User";

interface Order {
    id: number;
    username: User["username"];
    totalPrice: number;
    operationState: OrderState;
    creationTime: Date;
    products: { [index: Product["id"]]: number };
}

export default Order;
