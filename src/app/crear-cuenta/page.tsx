import RegisterPage from "@/components/RegisterPage";
import MySQLUserRepository from "@/services/MySQLUserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import { UserPasswordSchema, UserUsernameSchema } from "@/services/UserSchema";
import { redirect } from "next/navigation";

export default function Page() {
    async function registerUserAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        console.log(data);
        const validatedUsername = UserUsernameSchema.parse(data.username);
        const validatedPassword = UserPasswordSchema.parse(data.password);

        const encryptedPassword = await PasswordEncrypter.encrypt(
            validatedPassword,
        );
        const userRepository = new MySQLUserRepository();

        await userRepository.create(validatedUsername, encryptedPassword);

        redirect("/");
    }

    return <RegisterPage formAction={registerUserAction} />;
}
