import ApiStrings from "@/app/api/ApiStrings";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import OrderState from "@/models/OrderState";
import MockOrderRepository from "@/services/MockOrderRepository";
import { OrderSchema } from "@/services/OrderSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        const requestJson = await request.json();
        const orderRepository: OrderRepository = new MockOrderRepository();

        const validatedOrder = OrderSchema.parse({
            ...requestJson,
            operationState: OrderState.Pending,
        });
        await orderRepository.create(validatedOrder);

        return Response.json(validatedOrder);
    } catch (error) {
        console.error(ApiStrings.consoleOrderPostError, error);

        if (error instanceof ZodError) {
            return generateResponseError({
                message: ApiStrings.invalidFieldsMessage,
            });
        }

        return generateResponseError({
            message: ApiStrings.orderCreationErrorMessage,
        });
    }
}
