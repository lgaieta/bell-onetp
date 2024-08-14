import NotFoundError from "@/lib/NotFoundError";
import { generateResponseError } from "@/lib/utils";
import { ProductIdSchema } from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryId = searchParams.get("id");

        const validatedId = ProductIdSchema.parse(queryId);

        const productRepository: ProductRepository =
            new MockProductRepository();
        const product = await productRepository.getById(validatedId);

        if (!product) throw new NotFoundError("Product not found");

        return Response.json(product);
    } catch (error) {
        if (error instanceof ZodError)
            return generateResponseError(error.format());

        if (error instanceof NotFoundError)
            return generateResponseError({ message: "Product not found" });

        console.error("Error fetching the product:", error);

        return generateResponseError({
            message: "An error occurred while fetching the product.",
        });
    }
}
