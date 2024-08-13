import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

export async function GET(request: Request) {
    const productRepository: ProductRepository = new MockProductRepository();
    const list = await productRepository.getList();
    return Response.json(list);
}
