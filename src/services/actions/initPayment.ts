"use server";

import { ProductsListWithAmount } from "@/components/cart/CartPage";
import OrderState from "@/models/OrderState";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
    accessToken: process.env.MPAGO_ACCESS_TOKEN!,
});

export async function initPayment(products: ProductsListWithAmount) {
    const { isAuth, username, type } = await SessionManager.verifySession();
    if (type === SessionType.Admin) redirect("/");
    if (!isAuth) redirect("/iniciar-sesion?pay=true");

    const totalPrice = products.reduce(
        (acc, current) => acc + current.price * current.amount,
        0,
    );
    const order = {
        id: 1,
        username: username!,
        totalPrice: totalPrice,
        operationState: OrderState.Pending,
        creationTime: new Date(),
        products: products.reduce(
            (acc, product) => ({
                ...acc,
                [product.id]: product.amount,
            }),
            {},
        ),
    };

    const orderRepository = new MySQLOrderRepository();
    const { id: newOrderId } = await orderRepository.create(order);

    const preference = await new Preference(client).create({
        body: {
            items: products.map((product) => ({
                title: product.name,
                quantity: product.amount,
                unit_price: +product.price,
                id: product.id,
            })),
            back_urls: {
                success: `${process.env.APP_URL}/compras?dCrt=true&oid=${newOrderId}`,
                failure: `${process.env.APP_URL}/carrito?pE=true&oid=${newOrderId}`,
            },
            additional_info: String(newOrderId),
        },
    });

    if (preference.init_point) redirect(preference.init_point!);
    else return {};
}
