import EditProductPage from "@/components/edit-product/EditProductPage";
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

    return <EditProductPage product={product} />;
}
