import Product from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";
import MySQLPool from "@/services/MySQLPool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

type DBProduct = {
    idproduct: number;
    product_name: string;
    product_desc: string;
    price: number;
    stock: number;
};

function adaptProduct(item: DBProduct): Product {
    return {
        id: item.idproduct,
        name: item.product_name,
        description: item.product_desc,
        price: item.price,
        stock: item.stock,
    };
}

class MySQLProductRepository implements ProductRepository {
    async update(newProduct: Product): Promise<Product> {
        const sql =
            "UPDATE product SET product_name = ?, product_desc = ?, price = ?, stock = ? WHERE idproduct = ?";
        await MySQLPool.get().query<ResultSetHeader>(sql, [
            newProduct.name,
            newProduct.description,
            newProduct.price,
            newProduct.stock,
            newProduct.id,
        ]);
        return newProduct;
    }

    async delete(id: Product["id"]) {
        const sql = "DELETE FROM product WHERE idproduct = ?";
        await MySQLPool.get().query<ResultSetHeader>(sql, [id]);
    }

    async create(product: Product): Promise<Product> {
        const sql =
            "INSERT INTO product (product_name, product_desc, price, stock) VALUES (?, ?, ?, ?)";
        await MySQLPool.get().query<ResultSetHeader>(sql, [
            product.name,
            product.description,
            product.price,
            product.stock,
        ]);

        return product;
    }

    async getList(): Promise<Product[]> {
        const sql = "SELECT * FROM product";
        const [result] = await MySQLPool.get().query<RowDataPacket[]>(sql);
        const products: Product[] = result.map((item) =>
            adaptProduct(item as DBProduct),
        );

        return products;
    }

    async getById(id: number): Promise<Product> {
        const sql = "SELECT * FROM product WHERE idproduct = ?";
        const [result] = await MySQLPool.get().query<RowDataPacket[]>(sql, [
            id,
        ]);
        const product = adaptProduct(result[0] as DBProduct);

        return product;
    }

    async getByIdList(idList: Product["id"][]): Promise<Product[]> {
        const sql = "SELECT * FROM product WHERE idproduct IN (?)";
        const [result] = await MySQLPool.get().query<RowDataPacket[]>(sql, [
            idList,
        ]);
        const products: Product[] = result.map((item) =>
            adaptProduct(item as DBProduct),
        );

        return products;
    }
}

export default MySQLProductRepository;
