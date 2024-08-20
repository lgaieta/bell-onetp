"use server";

import { ProductsListWithAmount } from "@/components/cart/CartPage";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
    accessToken: process.env.MPAGO_ACCESS_TOKEN!,
});

export async function initPayment(products: ProductsListWithAmount) {
    const preference = await new Preference(client).create({
        body: {
            items: products.map((product) => ({
                title: product.name,
                quantity: product.amount,
                unit_price: +product.price,
                id: product.id,
            })),
        },
    });

    redirect(preference.sandbox_init_point!);
}
