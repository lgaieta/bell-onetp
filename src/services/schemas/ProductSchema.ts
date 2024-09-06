import { z } from "zod";

export const ProductIdSchema = z.coerce.string().min(1).max(50);

export const ProductSchema = z.object({
    id: ProductIdSchema,
    name: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(255),
    price: z.number().positive(),
    stock: z.number().positive(),
});
