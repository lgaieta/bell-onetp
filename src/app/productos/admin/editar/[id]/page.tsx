import EditProductPage from "@/components/EditProductPage";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema, ProductSchema } from "@/services/ProductSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const { isAuth, type } = await SessionManager.verifySession();
    if (!isAuth || type !== SessionType.Admin) redirect("/");
    const validatedId = ProductIdSchema.parse(params.id);

    const productRepository: ProductRepository = new MySQLProductRepository();
    const product = await productRepository.getById(validatedId);

    async function formAction(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData);

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
