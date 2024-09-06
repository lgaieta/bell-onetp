import ProductsAdminPage from "@/components/products-admin/ProductsAdminPage";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Administración de productos - bell",
};

export default async function Page() {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    return <ProductsAdminPage products={products} />;
}
