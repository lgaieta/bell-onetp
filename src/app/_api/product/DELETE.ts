import strings from "@/lib/strings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";
import { ProductIdSchema } from "@/services/schemas/ProductSchema";
import { ZodError } from "zod";

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        const validatedId = ProductIdSchema.parse(id);
        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.delete(validatedId);

        return Response.json({ success: true });
    } catch (error) {
        console.error(strings.api.product.console_product_delete_error, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_id_message,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: strings.api.product.product_delete_error_message,
        });
    }
}
