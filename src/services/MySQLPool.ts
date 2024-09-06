import mysql, { Pool } from "mysql2/promise";

export const MySQLPool: Pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "onetp",
    port: +process.env.DB_PORT!,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 5, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export default MySQLPool;
