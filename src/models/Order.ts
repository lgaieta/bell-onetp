import OrderState from "@/models/OrderState";
import Product from "@/models/Product";

interface Order {
    id: number;
    userId: string;
    totalPrice: number;
    operationState: OrderState;
    creationTime: Date;
    products: Product["id"][];
}

export default Order;
