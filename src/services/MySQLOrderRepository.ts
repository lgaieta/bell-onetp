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

class MySQLOrderRepository implements OrderRepository {
    async create(order: Order): Promise<Order> {
        const sql =
            "INSERT INTO orders (user_order, total_price, operation_state) VALUES (?, ?, ?)";
        const [result] = await MySQLPool.get().query<ResultSetHeader>(sql, [
            order.username,
            order.totalPrice,
            order.operationState,
        ]);
        return { ...order, id: result.insertId };
    }

    async delete(id: Order["id"]): Promise<void> {
        const sql = "DELETE FROM orders WHERE idorder = ?";
        await MySQLPool.get().query<ResultSetHeader>(sql, [id]);
    }

    async update(newOrder: Order): Promise<Order> {
        const sql =
            "UPDATE orders SET total_price = ?, operation_state = ? WHERE idorder = ?";
        await MySQLPool.get().query<ResultSetHeader>(sql, [
            newOrder.totalPrice,
            newOrder.operationState,
            newOrder.id,
        ]);

        return newOrder;
    }

    async getByUsername(username: User["username"]): Promise<Order[]> {
        const sql = "SELECT * FROM orders WHERE user_order = ?";
        const [dbOrders] = await MySQLPool.get().query<DBOrder[]>(sql, [
            username,
        ]);
        const [dbOrderHasProducts] = await MySQLPool.get().query<
            DBOrderHasProduct[]
        >(
            "SELECT r.order_idorder, r.product_idproduct, r.amount_prod FROM order_has_product AS r JOIN orders ON orders.user_order = ?",
            [username],
        );

        return this.formatRelationship({ dbOrders, dbOrderHasProducts });
    }

    async getList(): Promise<Order[]> {
        const sql = "SELECT * FROM orders";
        const [dbOrders] = await MySQLPool.get().query<DBOrder[]>(sql);

        const [dbOrderHasProducts] = await MySQLPool.get().query<
            DBOrderHasProduct[]
        >("SELECT product_idproduct FROM order_has_product");

        return this.formatRelationship({ dbOrders, dbOrderHasProducts });
    }

    async getById(id: Order["id"]): Promise<Order> {
        const sql = "SELECT * FROM orders WHERE idorder = ?";
        const [result] = await MySQLPool.get().query<DBOrder[]>(sql, [id]);
        if (result.length < 1)
            throw new NotFoundError(ApiStrings.orderNotFoundMessage);

        const adaptedOrder = this.adaptOrder(result[0]);
        const [productsResult] = await MySQLPool.get().query<
            DBOrderHasProduct[]
        >("SELECT * FROM order_has_product WHERE order_idorder = ?", [id]);

        const adaptedProducts = this.adaptOrderHasProduct(productsResult);

        return { ...adaptedOrder, products: adaptedProducts };
    }

    private adaptOrder(item: DBOrder): Omit<Order, "products"> {
        return {
            id: item.idorder,
            username: item.user_order,
            totalPrice: item.total_price,
            operationState: item.operation_state as OrderState,
            creationTime: item.create_time,
        };
    }

    private adaptOrderHasProduct(
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

    private formatRelationship({
        dbOrders,
        dbOrderHasProducts,
    }: {
        dbOrders: DBOrder[];
        dbOrderHasProducts: DBOrderHasProduct[];
    }) {
        const adaptedList: Order[] = [];

        dbOrders.forEach((order) => {
            const adaptedOrder = this.adaptOrder(order);
            const matchingProducts = dbOrderHasProducts.filter(
                (rel) => rel.order_idorder === adaptedOrder.id,
            );
            const adaptedProducts = this.adaptOrderHasProduct(matchingProducts);

            adaptedList.push({ ...adaptedOrder, products: adaptedProducts });
        });

        return adaptedList;
    }
}

export default MySQLOrderRepository;