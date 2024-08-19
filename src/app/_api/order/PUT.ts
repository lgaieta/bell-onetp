import ApiStrings from "@/app/_api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import { OrderSchema } from "@/services/OrderSchema";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";

export async function PUT(request: NextRequest) {
    try {
        const requestJson = await request.json();

        const validatedOrder = OrderSchema.parse(requestJson);

        const orderRepository: OrderRepository = new MySQLOrderRepository();

        await orderRepository.update(validatedOrder);

        return Response.json(validatedOrder);
    } catch (error) {
        console.error(ApiStrings.consoleOrderPutError, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidFieldsMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: ApiStrings.orderUpdateErrorMessage,
        });
    }
}
