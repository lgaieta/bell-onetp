import ApiStrings from "@/app/api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
import { ZodError } from "zod";

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        const validatedId = ProductIdSchema.parse(id);
        const productRepository: ProductRepository =
            new MockProductRepository();

        await productRepository.delete(validatedId);

        return Response.json({ success: true });
    } catch (error) {
        console.error(ApiStrings.consoleProductDeleteError, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidIdMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: ApiStrings.productDeleteErrorMessage,
        });
    }
}
