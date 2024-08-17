"use server";

import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
import { revalidatePath } from "next/cache";

export async function deleteProductAction(id: Product["id"], _: FormData) {
    const productRepository = new MySQLProductRepository();
    const validatedId = ProductIdSchema.parse(id);
    productRepository.delete(validatedId);
    revalidatePath("/productos/admin");
}
