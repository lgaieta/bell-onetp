import strings from "@/lib/strings";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import OrderState from "@/models/OrderState";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import { OrderSchema } from "@/services/schemas/OrderSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        const requestJson = await request.json();
        const orderRepository: OrderRepository = new MySQLOrderRepository();

        const validatedOrder = OrderSchema.parse({
            ...requestJson,
            operationState: OrderState.Pending,
        });
        await orderRepository.create(validatedOrder);

        return Response.json(validatedOrder);
    } catch (error) {
        console.error(strings.api.order.console_order_post_error, error);

        if (error instanceof ZodError) {
            return generateResponseError({
                message: strings.api.common.invalid_fields_message,
            });
        }

        return generateResponseError({
            message: strings.api.order.order_creation_error_message,
        });
    }
}
