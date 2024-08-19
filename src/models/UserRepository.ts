import User from "@/models/User";

interface UserRepository {
    create(
        username: User["username"],
        password: User["password"],
    ): Promise<void>;
    update(newUser: User): Promise<User>;
    delete(username: User["username"]): Promise<void>;
    getByUsername(username: User["username"]): Promise<User>;
}

export default UserRepository;
