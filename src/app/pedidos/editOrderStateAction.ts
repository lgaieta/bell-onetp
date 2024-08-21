"use server";

import { revalidatePath } from "next/cache";
import MySQLOrderRepository from "@/services/repositories/MySQLOrderRepository";
import Order from "@/models/Order";
import {
    OrderIdSchema,
    OrderOperationStateSchema,
} from "@/services/schemas/OrderSchema";

export async function editOrderStateAction(
    id: Order["id"],
    newState: Order["operationState"],
    _: FormData,
) {
    const validatedId = OrderIdSchema.parse(id);
    const validatedNewState = OrderOperationStateSchema.parse(newState);
    const orderRepository = new MySQLOrderRepository();
    await orderRepository.updateState(validatedId, validatedNewState);

    revalidatePath("/pedidos/" + id);
}
