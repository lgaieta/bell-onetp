import EditProductPage from "@/components/EditProductPage";
import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";

export default async function Page({ params }: { params: { id: string } }) {
    const validatedId = ProductIdSchema.parse(params.id);

    const productRepository: ProductRepository = new MockProductRepository();
    const product = await productRepository.getById(validatedId);

    return <EditProductPage product={product} formAction={() => {}} />;
}
