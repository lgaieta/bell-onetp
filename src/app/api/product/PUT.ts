import ApiStrings from "@/app/api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { ProductIdSchema, ProductSchema } from "@/services/ProductSchema";
import { ZodError } from "zod";

export async function PUT(request: Request) {
    try {
        const { id, ...requestJson } = await request.json();

        const validatedId = ProductIdSchema.parse(id);
        const validatedProduct = ProductSchema.parse(requestJson);

        const productRepository: ProductRepository =
            new MockProductRepository();

        await productRepository.update(validatedId, validatedProduct);

        return Response.json(requestJson);
    } catch (error) {
        console.error(ApiStrings.consoleProductPutError, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidFieldsMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        return generateResponseError({
            message: ApiStrings.productUpdateErrorMessage,
        });
    }
}
