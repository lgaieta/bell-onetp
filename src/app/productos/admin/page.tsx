import ProductsAdminPage from "@/components/ProductsAdminPage";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
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

    async function handleOnDeleteProduct(
        id: Product["id"],
        formData: FormData,
    ) {
        "use server";
        const { isAuth, type } = await SessionManager.verifySession();
        if (!isAuth || type !== SessionType.Admin) redirect("/");

        const validatedId = ProductIdSchema.parse(id);
        productRepository.delete(validatedId);
    }

    return (
        <ProductsAdminPage
            products={products}
            onDeleteProductAction={handleOnDeleteProduct}
        />
    );
}
