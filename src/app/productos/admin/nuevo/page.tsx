import CreateProductPage from "@/components/create-product/CreateProductPage";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Cargar producto - bell",
};

export default async function Page() {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");

    return <CreateProductPage />;
}
