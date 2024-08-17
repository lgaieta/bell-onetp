import ProductsAdminPage from "@/components/ProductsAdminPage";
import Product from "@/models/Product";
import MySQLProductRepository from "@/services/MySQLProductRepository";
import { ProductIdSchema } from "@/services/ProductSchema";

export default async function Page() {
    const productRepository = new MySQLProductRepository();
    const products = await productRepository.getList();

    async function handleOnDeleteProduct(
        id: Product["id"],
        formData: FormData,
    ) {
        "use server";

        const validatedId = ProductIdSchema.parse(id);
        productRepository.delete(validatedId);
    }

    return (
        <ProductsAdminPage
            products={products}
            onDeleteProductAction={handleOnDeleteProduct}
        />
    );
}
