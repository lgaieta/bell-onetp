import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryId = searchParams.get("id");

        if (!queryId) throw new Error("Query parameter 'id' is missing.");
        if (isNaN(+queryId))
            throw new Error("Query parameter 'id' must be a number.");

        const productRepository: ProductRepository =
            new MockProductRepository();
        const product = await productRepository.getById(+queryId);

        return Response.json(product);
    } catch (error) {
        console.error("Error fetching the product:", error);
        return new Response(
            JSON.stringify({
                message: "An error occurred while fetching the product.",
            }),
            {
                status: 500,
            },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const requestJson = await request.json();
        if (!requestJson.email || !requestJson.password) throw new Error("Request body is missing.");

        const productRepository: ProductRepository =
            new MockProductRepository();

        await productRepository.create({
            id: 1,
            name: "Laptop",
            price: 999.99,
            description: "Laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
            stock: 25
        })

        return Response.json({ requestJson: requestJson.body });
    } catch (error) {
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
