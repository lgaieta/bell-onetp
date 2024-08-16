import ApiStrings from "@/app/api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import Order from "@/models/Order";
import OrderRepository from "@/models/OrderRepository";
import OrderState from "@/models/OrderState";
import User from "@/models/User";
import MySQLPool from "@/services/MySQLPool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface DBOrder extends RowDataPacket {
    idorder: number;
    user_order: string;
    create_time: Date;
    total_price: number;
    operation_state:
        | "pending"
        | "processed"
        | "shipped"
        | "delivered"
        | "canceled";
}

interface DBOrderHasProduct extends RowDataPacket {
    order_idorder: number;
    product_idproduct: number;
    amount_prod: number;
}

function adaptOrder(item: DBOrder): Omit<Order, "products"> {
    return {
        id: item.idorder,
        username: item.user_order,
        totalPrice: item.total_price,
        operationState: item.operation_state as OrderState,
        creationTime: item.create_time,
    };
}

function adaptOrderHasProduct(
    products: DBOrderHasProduct[],
): Order["products"] {
    return products.reduce(
        (accumulator, current) => ({
            ...accumulator,
            [current.product_idproduct]: current.amount_prod,
        }),
        {},
    );
}

class MySQLOrderRepository implements OrderRepository {
    async create(order: Order): Promise<Order> {
        const sql =
            "INSERT INTO orders (user_order, create_time, total_price, operation_state) VALUES (?, ?, ?, ?)";
        const [result] = await MySQLPool.get().query<ResultSetHeader>(sql, [
            order.username,
            order.creationTime,
            order.totalPrice,
            order.operationState,
        ]);
        return { ...order, id: result.insertId };
    }

    async update(newOrder: Order): Promise<Order> {
        return newOrder;
    }

    async getByUsername(username: User["username"]): Promise<Order[]> {
        const sql = "SELECT * FROM orders WHERE username";
        return [];
    }

    async getList(): Promise<Order[]> {
        const sql = "SELECT * FROM orders";
        const [result] = await MySQLPool.get().query<DBOrder[]>(sql);

        const [productsResult] = await MySQLPool.get().query<
            DBOrderHasProduct[]
        >("SELECT product_idproduct FROM order_has_product");

        const adaptedList: Order[] = [];

        result.forEach((order) => {
            const adaptedOrder = adaptOrder(order);
            const matchingProducts = productsResult.filter(
                (rel) => rel.order_idorder === adaptedOrder.id,
            );
            const adaptedProducts = adaptOrderHasProduct(matchingProducts);

            adaptedList.push({ ...adaptedOrder, products: adaptedProducts });
        });

        return adaptedList;
    }

    async getById(id: Order["id"]): Promise<Order> {
        const sql = "SELECT * FROM orders WHERE idorder = ?";
        const [result] = await MySQLPool.get().query<DBOrder[]>(sql, [id]);
        if (result[0]) throw new NotFoundError(ApiStrings.orderNotFoundMessage);

        const adaptedOrder = adaptOrder(result[0]);
        const [productsResult] = await MySQLPool.get().query<
            DBOrderHasProduct[]
        >("SELECT *s FROM order_has_product WHERE order_idorder = ?", [id]);

        const adaptedProducts = adaptOrderHasProduct(productsResult);

        return { ...adaptedOrder, products: adaptedProducts };
    }

    async delete(id: Order["id"]): Promise<void> {}
}

export default MySQLOrderRepository;
