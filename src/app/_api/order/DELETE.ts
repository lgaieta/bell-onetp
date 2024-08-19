import ApiStrings from "@/app/_api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import { OrderIdSchema } from "@/services/OrderSchema";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        const validatedUserId = OrderIdSchema.parse(id);
        const orderRepository: OrderRepository = new MySQLOrderRepository();

        await orderRepository.delete(validatedUserId);

        return Response.json({ success: true });
    } catch (error) {
        console.error(ApiStrings.consoleOrderDeleteError, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidIdMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: ApiStrings.orderDeleteErrorMessage,
        });
    }
}
