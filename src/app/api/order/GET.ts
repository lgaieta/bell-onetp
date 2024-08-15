import ApiStrings from "@/app/api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import OrderRepository from "@/models/OrderRepository";
import MockOrderRepository from "@/services/MockOrderRepository";
import { UserUsernameSchema } from "@/services/UserSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get(ApiStrings.userUsernameKey);

        const validatedUserId = UserUsernameSchema.parse(queryUserId);

        const orderRepository: OrderRepository = new MockOrderRepository();
        const order = await orderRepository.getByUsername(validatedUserId);

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
