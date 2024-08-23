import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import { OrderIdSchema } from "@/services/OrderSchema";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import strings from "@/lib/strings";

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        const validatedUserId = OrderIdSchema.parse(id);
        const orderRepository: OrderRepository = new MySQLOrderRepository();

        await orderRepository.delete(validatedUserId);

        return Response.json({ success: true });
    } catch (error) {
        console.error(strings.api.order.console_order_delete_error, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_id_message,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: strings.api.order.order_delete_error_message,
        });
    }
}
