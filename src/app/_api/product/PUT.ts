import ApiStrings from "@/app/_api/ApiStrings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductSchema } from "@/services/ProductSchema";
import { ZodError } from "zod";

export async function PUT(request: Request) {
    try {
        const requestJson = await request.json();

        const validatedProduct = ProductSchema.parse(requestJson);

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.update(validatedProduct);

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
