import RegisterPage from "@/components/register/RegisterPage";
import SessionManager from "@/services/SessionManager";
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
