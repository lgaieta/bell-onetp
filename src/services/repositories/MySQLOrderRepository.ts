import ApiStrings from "@/app/_api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import Order from "@/models/Order";
import OrderRepository from "@/models/OrderRepository";
import OrderState from "@/models/OrderState";
import User from "@/models/User";
import MySQLPool from "@/services/repositories/MySQLPool";
import {
    adaptProductMySQL,
    MySQLDBProduct,
} from "@/services/repositories/MySQLProductRepository";
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
    orders_idorder: number;
    product_idproduct: string;
    amount_prod: number;
}

class MySQLOrderRepository implements OrderRepository {
    async create(order: Order): Promise<Order> {
        const sql =
            "INSERT INTO orders (user_order, total_price, operation_state) VALUES (?, ?, ?)";
        const [result] = await MySQLPool.query<ResultSetHeader>(sql, [
            order.username,
            order.totalPrice,
            order.operationState,
        ]);

        const relationshipValues = Object.entries(order.products).map(
            ([key, value]) => {
                return `(${result.insertId}, ${MySQLPool.escape(
                    key,
                )}, ${MySQLPool.escape(value)})`;
            },
        );

        const relSql =
            "INSERT INTO orders_has_product (orders_idorder, product_idproduct, amount_prod) VALUES " +
            relationshipValues.join(",");
        await MySQLPool.query<ResultSetHeader>(relSql);
        return { ...order, id: result.insertId };
    }

    async delete(id: Order["id"]): Promise<void> {
        const deleteRelationshipSql =
            "DELETE FROM orders_has_product WHERE orders_idorder = ?";
        await MySQLPool.query<ResultSetHeader>(deleteRelationshipSql, [id]);

        const sql = "DELETE FROM orders WHERE idorder = ?";
        await MySQLPool.query<ResultSetHeader>(sql, [id]);
    }

    async updateState(
        id: Order["id"],
        newState: Order["operationState"],
    ): Promise<void> {
        const sql = "UPDATE orders SET operation_state = ? WHERE idorder = ?";
        const [result] = await MySQLPool.query<ResultSetHeader>(sql, [
            newState,
            id,
        ]);
    }

    async update(newOrder: Order): Promise<Order> {
        const sql =
            "UPDATE orders SET total_price = ?, operation_state = ? WHERE idorder = ?";
        const [result] = await MySQLPool.query<ResultSetHeader>(sql, [
            newOrder.totalPrice,
            newOrder.operationState,
            newOrder.id,
        ]);

        const relationshipValues = Object.entries(newOrder.products).map(
            ([key, value]) => {
                return `(${newOrder.id}, ${MySQLPool.escape(
                    key,
                )}, ${MySQLPool.escape(value)})`;
            },
        );

        const relSql =
            "INSERT INTO orders_has_product (orders_idorder, product_idproduct, amount_prod) VALUES " +
            relationshipValues.join(",") +
            " ON DUPLICATE KEY UPDATE orders_idorder=VALUES(orders_idorder), product_idproduct = VALUES(product_idproduct), amount_prod = VALUES(amount_prod)";
        await MySQLPool.query<ResultSetHeader>(relSql);

        return newOrder;
    }

    async getProducts(orderId: Order["id"]) {
        const sql = `SELECT p.* 
            FROM orders_has_product AS oh
            JOIN product AS p ON oh.product_idproduct = p.idproduct
            WHERE oh.orders_idorder = ?;
        `;
        const [dbProductsOfOrder] = await MySQLPool.query<MySQLDBProduct[]>(
            sql,
            [orderId],
        );

        const products = dbProductsOfOrder.map((dbProduct) =>
            adaptProductMySQL(dbProduct),
        );

        return products;
    }

    async getByUsername(username: User["username"]): Promise<Order[]> {
        const sql = "SELECT * FROM orders WHERE user_order = ?";
        const [dbOrders] = await MySQLPool.query<DBOrder[]>(sql, [username]);
        const [dbOrderHasProducts] = await MySQLPool.query<DBOrderHasProduct[]>(
            "SELECT * FROM orders_has_product JOIN orders ON orders.idorder = orders_has_product.orders_idorder AND orders.user_order = ?",
            [username],
        );

        return this.formatRelationship({ dbOrders, dbOrderHasProducts });
    }

    async getList(): Promise<Order[]> {
        const sql = "SELECT * FROM orders";
        const [dbOrders] = await MySQLPool.query<DBOrder[]>(sql);

        const [dbOrderHasProducts] = await MySQLPool.query<DBOrderHasProduct[]>(
            "SELECT product_idproduct FROM orders_has_product",
        );

        return this.formatRelationship({ dbOrders, dbOrderHasProducts });
    }

    async getById(id: Order["id"]): Promise<Order> {
        const sql = "SELECT * FROM orders WHERE idorder = ?";
        const [result] = await MySQLPool.query<DBOrder[]>(sql, [id]);
        if (result.length < 1)
            throw new NotFoundError(ApiStrings.orderNotFoundMessage);

        const adaptedOrder = this.adaptOrder(result[0]);
        const [productsResult] = await MySQLPool.query<DBOrderHasProduct[]>(
            "SELECT * FROM orders_has_product WHERE orders_idorder = ?",
            [id],
        );

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
                (rel) => rel.orders_idorder === adaptedOrder.id,
            );
            const adaptedProducts = this.adaptOrderHasProduct(matchingProducts);

            adaptedList.push({ ...adaptedOrder, products: adaptedProducts });
        });

        return adaptedList;
    }
}

export default MySQLOrderRepository;
