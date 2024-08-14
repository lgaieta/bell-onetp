import ApiStrings from "@/app/api/ApiStrings";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

export async function GET() {
    try {
        const productRepository: ProductRepository =
            new MockProductRepository();
        const list = await productRepository.getList();
        return Response.json(list);
    } catch (error) {
        console.error(ApiStrings.consoleProductListFetchError, error);
        return generateResponseError({
            message: ApiStrings.productListFetchErrorMessage,
        });
    }
}
