import ApiStrings from "@/app/_api/ApiStrings";
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
        const queryId = searchParams.get(ApiStrings.productIdKey);

        const validatedId = ProductIdSchema.parse(queryId);

        const productRepository: ProductRepository =
            new MySQLProductRepository();
        const product = await productRepository.getById(validatedId);

        if (!product)
            throw new NotFoundError(ApiStrings.productNotFoundMessage);

        return Response.json(product);
    } catch (error) {
        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidIdMessage,
            });

        if (error instanceof NotFoundError)
            return generateResponseError({ message: error.message });

        console.error(ApiStrings.consoleProductFetchError, error);

        return generateResponseError({
            message: ApiStrings.productFetchErrorMessage,
        });
    }
}
