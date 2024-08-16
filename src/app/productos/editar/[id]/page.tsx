import EditProductPage from "@/components/EditProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema, ProductSchema } from "@/services/ProductSchema";

export default async function Page({ params }: { params: { id: string } }) {
    const validatedId = ProductIdSchema.parse(params.id);

    const productRepository: ProductRepository = new MySQLProductRepository();
    const product = await productRepository.getById(validatedId);

    async function formAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        console.log(data);

        const validatedProduct = ProductSchema.parse({
            id: validatedId,
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
        });

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.update(validatedProduct);
    }

    return <EditProductPage product={product} formAction={formAction} />;
}
