import strings from "@/lib/strings";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductSchema } from "@/services/ProductSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        const requestJson = await request.json();
        const productRepository: ProductRepository =
            new MySQLProductRepository();
        const validatedProduct = ProductSchema.parse(requestJson);
        await productRepository.create(validatedProduct);

        return Response.json(requestJson);
    } catch (error) {
        console.error(strings.api.product.console_product_post_error, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: strings.api.common.invalid_fields_message,
            });

        return generateResponseError({
            message: strings.api.product.product_creation_error_message,
        });
    }
}
