import strings from "@/lib/strings";
import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryId = searchParams.get(strings.api.product.product_id_key);

        const validatedId = ProductIdSchema.parse(queryId);

        const productRepository: ProductRepository =
            new MySQLProductRepository();
        const product = await productRepository.getById(validatedId);

        if (!product)
            throw new NotFoundError(
                strings.api.product.product_not_found_message,
            );

        return Response.json(product);
    } catch (error) {
        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_id_message,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        console.error(strings.api.product.console_product_fetch_error, error);

        return generateResponseError({
            message: strings.api.product.product_fetch_error_message,
        });
    }
}
