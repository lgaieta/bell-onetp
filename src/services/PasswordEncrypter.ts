import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class PasswordEncrypter {
    static async encrypt(password: string) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    }

    static async compare(rawPassword: string, hashedPassword: string) {
        const isValid = await bcrypt.compare(rawPassword, hashedPassword);
        return isValid;
    }
}

export default PasswordEncrypter;
