"use server";

import { CART_COOKIE_NAME } from "@/lib/constants";
import Product from "@/models/Product";
import { ProductIdSchema } from "@/services/ProductSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function removeFromCartAction(id: Product["id"]) {
    const productsMap = JSON.parse(
        cookies().get(CART_COOKIE_NAME)?.value || "{}",
    );

    const validatedId = ProductIdSchema.parse(id);

    const { [validatedId]: removed, ...newProducts } = productsMap;

    cookies().set(CART_COOKIE_NAME, JSON.stringify(newProducts));

    revalidatePath("/carrito");
}
