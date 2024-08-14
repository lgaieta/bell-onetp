import ApiStrings from "@/app/api/ApiStrings";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { ProductSchema } from "@/services/ProductSchema";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        const requestJson = await request.json();
        const productRepository: ProductRepository =
            new MockProductRepository();
        const validatedProduct = ProductSchema.parse(requestJson);
        await productRepository.create(validatedProduct);

        return Response.json(requestJson);
    } catch (error) {
        console.error(ApiStrings.consoleProductPostError, error);

        if (error instanceof ZodError)
            return generateResponseError({
                message: ApiStrings.invalidFieldsMessage,
            });

        return generateResponseError({
            message: ApiStrings.productCreationErrorMessage,
        });
    }
}
