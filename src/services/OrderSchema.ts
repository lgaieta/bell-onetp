import { z } from "zod";
import OrderState from "@/models/OrderState";
import { UserUsernameSchema } from "@/services/UserSchema";

export const OrderSchema = z.object({
    id: z.number().int().positive(),
    username: UserUsernameSchema,
    totalPrice: z.number().positive(),
    operationState: z.nativeEnum(OrderState),
    creationTime: z.coerce.date(),
    products: z.array(z.number().int()).nonempty(),
});

export default OrderSchema;
