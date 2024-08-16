import { z } from "zod";
import OrderState from "@/models/OrderState";
import { UserUsernameSchema } from "@/services/UserSchema";

export const OrderIdSchema = z.coerce.number().int().positive();

export const OrderSchema = z.object({
    id: OrderIdSchema,
    username: UserUsernameSchema,
    totalPrice: z.number().positive(),
    operationState: z.nativeEnum(OrderState),
    creationTime: z.coerce.date(),
    products: z.record(
        z.coerce.number().int().positive(),
        z.number().int().nonnegative(),
    ),
});

export default OrderSchema;
