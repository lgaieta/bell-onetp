"use server";

import { ProductsListWithAmount } from "@/components/cart/CartPage";
import { CART_COOKIE_NAME } from "@/lib/constants";
import Product from "@/models/Product";
import { ProductIdSchema } from "@/services/ProductSchema";
import { cookies } from "next/headers";

export async function editCartProducts(products: ProductsListWithAmount) {
    const productsAmounts = products.reduce(
        (acc, p) => ({ ...acc, [p.id]: p.amount }),
        {},
    );
    cookies().set(CART_COOKIE_NAME, JSON.stringify(productsAmounts));
}
