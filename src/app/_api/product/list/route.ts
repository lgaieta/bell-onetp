import ApiStrings from "@/app/_api/ApiStrings";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";

export async function GET() {
    try {
        const productRepository: ProductRepository =
            new MySQLProductRepository();
        const list = await productRepository.getList();
        return Response.json(list);
    } catch (error) {
        console.error(ApiStrings.consoleProductListFetchError, error);
        return generateResponseError({
            message: ApiStrings.productListFetchErrorMessage,
        });
    }
}
