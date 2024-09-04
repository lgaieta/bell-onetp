import ApiStrings from "@/app/_api/ApiStrings";
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
        const queryId = searchParams.get(ApiStrings.orderIdKey);

        const validatedId = OrderIdSchema.parse(queryId);

        const orderRepository: OrderRepository = new MySQLOrderRepository();
        const order = await orderRepository.getById(validatedId);

        return Response.json(order);
    } catch (error) {
        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidIdMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        console.error(ApiStrings.consoleOrderFetchError, error);

        return generateResponseError({
            message: ApiStrings.orderFetchErrorMessage,
        });
    }
}
