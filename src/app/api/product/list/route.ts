import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

export async function GET(request: Request) {
    try {
        const productRepository: ProductRepository =
            new MockProductRepository();
        const list = await productRepository.getList();
        return Response.json(list);
    } catch (error) {
        console.error("Error fetching the product list:", error);
        return new Response(
            JSON.stringify({
                message: "An error occurred while fetching the product list.",
            }),
            {
                status: 500,
            },
        );
    }
}
