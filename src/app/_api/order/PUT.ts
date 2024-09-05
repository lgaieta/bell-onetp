import strings from "@/lib/strings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import { OrderSchema } from "@/services/schemas/OrderSchema";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";

export async function PUT(request: NextRequest) {
    try {
        const requestJson = await request.json();

        const validatedOrder = OrderSchema.parse(requestJson);

        const orderRepository: OrderRepository = new MySQLOrderRepository();

        await orderRepository.update(validatedOrder);

        return Response.json(validatedOrder);
    } catch (error) {
        console.error(strings.api.order.console_order_put_error, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_fields_message,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: strings.api.order.order_update_error_message,
        });
    }
}
