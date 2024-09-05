"use server";

import Order from "@/models/Order";
import OrderState from "@/models/OrderState";
import MySQLOrderRepository from "@/services/MySQLOrderRepository";
import {
    OrderIdSchema,
    OrderOperationStateSchema,
} from "@/services/OrderSchema";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(id: Order["id"], _: FormData) {
    const validatedId = OrderIdSchema.parse(id);
    const orderRepository = new MySQLOrderRepository();
    await orderRepository.updateState(validatedId, OrderState.Canceled);

    revalidatePath("/pedidos/" + id);
}
