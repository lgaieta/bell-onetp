import LoginPage from "@/components/LoginPage";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import {
    UserUsernameSchema,
    UserPasswordSchema,
} from "@/services/schemas/UserSchema";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Iniciar sesión - bell",
};

export default async function Page() {
    const sessionVerification = await SessionManager.verifySession();
    if (sessionVerification.isAuth) redirect("/");

    async function loginUserAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        const validatedUsername = UserUsernameSchema.parse(data.username);
        const validatedPassword = UserPasswordSchema.parse(data.password);

        const isAdmin =
            validatedPassword === process.env.ADMIN_PASSWORD &&
            validatedUsername === process.env.ADMIN_USER;

        if (isAdmin) {
            await SessionManager.createSession(
                validatedUsername,
                SessionType.Admin,
            );
            redirect("/");
        }

        const userRepository = new MySQLUserRepository();

        const savedUser = await userRepository.getByUsername(validatedUsername);

        const passwordValid = PasswordEncrypter.compare(
            validatedPassword,
            savedUser.password,
        );

        if (!passwordValid)
            throw new Error("Password or username are invalid.");

        await SessionManager.createSession(
            validatedUsername,
            SessionType.Client,
        );

        redirect("/");
    }
    return <LoginPage formAction={loginUserAction} />;
}
