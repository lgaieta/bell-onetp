import CreateProductPage from "@/components/CreateProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductSchema } from "@/services/ProductSchema";

export default function Page() {
    async function formAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        const validatedProduct = ProductSchema.parse({
            id: 1,
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
        });

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.create(validatedProduct);
    }

    return <CreateProductPage formAction={formAction} />;
}
