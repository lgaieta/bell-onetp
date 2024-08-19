import RegisterPage from "@/components/RegisterPage";
import MySQLUserRepository from "@/services/MySQLUserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { UserPasswordSchema, UserUsernameSchema } from "@/services/UserSchema";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Crear cuenta - bell",
};

export default async function Page() {
    const sessionVerification = await SessionManager.verifySession();
    if (sessionVerification.isAuth) redirect("/");

    async function registerUserAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        const validatedUsername = UserUsernameSchema.parse(data.username);
        const validatedPassword = UserPasswordSchema.parse(data.password);

        const encryptedPassword = await PasswordEncrypter.encrypt(
            validatedPassword,
        );
        const userRepository = new MySQLUserRepository();

        await userRepository.create(validatedUsername, encryptedPassword);

        await SessionManager.createSession(
            validatedUsername,
            SessionType.Client,
        );

        redirect("/");
    }

    return <RegisterPage formAction={registerUserAction} />;
}
