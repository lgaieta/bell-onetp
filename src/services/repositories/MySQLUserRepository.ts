import AlreadyExistsError from "@/lib/AlreadyExistsError";
import NotFoundError from "@/lib/NotFoundError";
import User from "@/models/User";
import UserRepository from "@/models/UserRepository";
import MySQLPool from "@/services/repositories/MySQLPool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface MySQLUser extends RowDataPacket {
    username: string;
    email: string;
    password: string;
    CP: string;
}

class MySQLUserRepository implements UserRepository {
    async create(
        username: User["username"],
        password: User["password"],
    ): Promise<void> {
        try {
            const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
            await MySQLPool.query<ResultSetHeader>(sql, [username, password]);
        } catch (e) {
            if ((e as any)?.code === "ER_DUP_ENTRY") {
                throw new AlreadyExistsError(
                    `User "${username}" already exists`,
                );
            }
            throw e;
        }
    }

    update(newUser: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(username: User["username"]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getByUsername(username: User["username"]): Promise<User> {
        const sql =
            "SELECT username, email, password, CP FROM user WHERE username = ?";
        const [dbUser] = await MySQLPool.query<MySQLUser[]>(sql, [username]);

        if (!dbUser[0]) throw new NotFoundError("User not found.");

        return this.adaptDbUser(dbUser[0]);
    }

    private adaptDbUser(dbUser: MySQLUser): User {
        return {
            username: dbUser.username,
            email: dbUser.email,
            password: dbUser.password,
            zipCode: dbUser.CP,
        };
    }
}

export default MySQLUserRepository;
