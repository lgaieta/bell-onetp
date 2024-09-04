import EditProductPage from "@/components/EditProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";
import {
    ProductIdSchema,
    ProductSchema,
} from "@/services/schemas/ProductSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Editar producto - bell",
};

export default async function Page({ params }: { params: { id: string } }) {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const validatedId = ProductIdSchema.parse(params.id);

    const productRepository: ProductRepository = new MySQLProductRepository();
    const product = await productRepository.getById(validatedId);

    async function formAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        const validatedProduct = ProductSchema.parse({
            id: validatedId,
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
        });

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.update(validatedProduct);
    }

    return <EditProductPage product={product} formAction={formAction} />;
}
