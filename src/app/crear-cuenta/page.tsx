import RegisterPage from "@/components/register/RegisterPage";
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

    return <RegisterPage />;
}
