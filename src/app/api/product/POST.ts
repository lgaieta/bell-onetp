import { ProductSchema } from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
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
        if (error instanceof ZodError)
            return Response.json(error.format(), {
                status: 500,
            });
            
        console.error("Error creating the product:", error);
        return new Response(
            JSON.stringify({
                message: "An error occurred while creating the product.",
            }),
            {
                status: 500,
            },
        );
    }
}
