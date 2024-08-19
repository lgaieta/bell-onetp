import User from "@/models/User";

interface UserRepository {
    create(user: User): Promise<User>;
    update(newUser: User): Promise<User>;
    delete(username: User["username"]): Promise<void>;
    getByUsername(username: User["username"]): Promise<User>;
}

export default UserRepository;
