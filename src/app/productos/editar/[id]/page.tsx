import EditProductPage from "@/components/EditProductPage";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { mysqlPool } from "@/services/MySQLPool";
import { ProductIdSchema } from "@/services/ProductSchema";

export default async function Page({ params }: { params: { id: string } }) {
    console.log(await mysqlPool.query("DESCRIBE product"));
    const validatedId = ProductIdSchema.parse(params.id);

    const productRepository: ProductRepository = new MockProductRepository();
    const product = await productRepository.getById(validatedId);

    return <EditProductPage product={product} formAction={() => {}} />;
}
