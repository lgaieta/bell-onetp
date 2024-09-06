import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import crypto from "crypto";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import OrderState from "@/models/OrderState";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { CART_COOKIE_NAME } from "@/lib/constants";

const client = new MercadoPagoConfig({
    accessToken: process.env.MPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
    const dataId = request.nextUrl.searchParams.get("data.id");
    const body = await request
        .json()
        .then((data) => data as { data: { id: string } });
    const signature_header = request.headers.get("x-signature");
    const requestId_header = request.headers.get("x-request-id");

    if (!signature_header)
        return Response.json({ error: "Unauthorized" }, { status: 401 });

    const parts = signature_header.split(",");

    // Initializing variables to store ts and hash
    let ts;
    let hash;

    // Iterate over the values to obtain ts and v1
    parts.forEach((part) => {
        // Split each part into key and value
        const [key, value] = part.split("=");
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === "ts") {
                ts = trimmedValue;
            } else if (trimmedKey === "v1") {
                hash = trimmedValue;
            }
        }
    });

    const manifest = `id:${dataId};request-id:${requestId_header};ts:${ts};`;

    // Create an HMAC signature
    const hmac = crypto.createHmac(
        "sha256",
        process.env.MPAGO_PAYMENT_SIGNATURE!,
    );
    hmac.update(manifest);

    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest("hex");

    if (sha === hash) {
        // HMAC verification passed
        console.log("HMAC verification passed");
    } else {
        // HMAC verification failed
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payment = await new Payment(client).get({ id: body.data.id });

    // const orderRepository = new MySQLOrderRepository();
    // await orderRepository.update({
    //     id: +20,
    //     username: "",
    //     totalPrice: payment.transaction_amount!,
    //     creationTime: new Date(),
    //     operationState: OrderState.Processed,
    //     products: {},
    // });

    revalidatePath("/compras");
    cookies().set(CART_COOKIE_NAME, "{}");

    return Response.json({ success: true });
}
