"use server";

import { CART_COOKIE_NAME } from "@/lib/constants";
import Product from "@/models/Product";
import { ProductIdSchema } from "@/services/ProductSchema";
import { cookies } from "next/headers";

export async function addToCartAction(id: Product["id"]) {
    const productsIds = JSON.parse(
        cookies().get(CART_COOKIE_NAME)?.value || "[]",
    );
    const validatedId = ProductIdSchema.parse(id);
    cookies().set(
        CART_COOKIE_NAME,
        JSON.stringify([...productsIds, validatedId]),
    );
}
