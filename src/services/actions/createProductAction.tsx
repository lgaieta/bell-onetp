"use server";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";
import { ProductSchema } from "@/services/schemas/ProductSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
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

    const productRepository: ProductRepository = new MySQLProductRepository();

    await productRepository.create(validatedProduct);

    redirect("/productos/admin");
}
