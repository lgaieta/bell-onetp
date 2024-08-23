import strings from "@/lib/strings";
import { generateResponseError } from "@/lib/utils";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";

export async function GET() {
    try {
        const productRepository: ProductRepository =
            new MySQLProductRepository();
        const list = await productRepository.getList();
        return Response.json(list);
    } catch (error) {
        console.error(
            strings.api.product.console_product_list_fetch_error,
            error,
        );
        return generateResponseError({
            message: strings.api.product.product_list_fetch_error_message,
        });
    }
}
