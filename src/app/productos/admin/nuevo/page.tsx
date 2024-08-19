import CreateProductPage from "@/components/CreateProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductSchema } from "@/services/ProductSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Nuevo producto - bell",
};

export default async function Page() {
    async function formAction(formData: FormData) {
        "use server";
        const { isAuth, type } = await SessionManager.verifySession();
        if (!isAuth || type !== SessionType.Admin) redirect("/");
        const data = Object.fromEntries(formData);

        const validatedProduct = ProductSchema.parse({
            id: data.id,
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
        });

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.create(validatedProduct);
    }

    return <CreateProductPage formAction={formAction} />;
}
