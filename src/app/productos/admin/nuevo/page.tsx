import CreateProductPage from "@/components/CreateProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLPool from "@/services/MySQLPool";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductSchema } from "@/services/ProductSchema";

export default async function Page() {
    async function formAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

        const validatedProduct = ProductSchema.parse({
            id: data.id,
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
