import mysql, { Pool } from "mysql2/promise";

let pool: Pool | undefined = undefined;

class MySQLPool {
    static get() {
        if (pool) return pool;

        pool = mysql.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "1234",
            database: process.env.DB_NAME || "onetp",
            port: +process.env.DB_PORT!,
        });

        return pool;
    }
}

export default MySQLPool;
