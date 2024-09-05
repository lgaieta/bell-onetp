import strings from "@/lib/strings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import { OrderIdSchema } from "@/services/schemas/OrderSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryId = searchParams.get(strings.api.order.order_id_key);

        const validatedId = OrderIdSchema.parse(queryId);

        const orderRepository: OrderRepository = new MySQLOrderRepository();
        const order = await orderRepository.getById(validatedId);

        return Response.json(order);
    } catch (error) {
        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_id_message,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        console.error(strings.api.order.console_order_fetch_error, error);

        return generateResponseError({
            message: strings.api.order.order_fetch_error_message,
        });
    }
}
