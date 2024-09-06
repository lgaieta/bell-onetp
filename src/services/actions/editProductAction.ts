"use server";
import { EditProductFormState } from "@/components/edit-product/EditProductForm";
import { areObjectsEqual } from "@/lib/areObjectsEqual";
import NotFoundError from "@/lib/NotFoundError";
import Product from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";
import MySQLProductRepository from "@/services/repositories/MySQLProductRepository";
import { ProductSchema } from "@/services/schemas/ProductSchema";
import { redirect } from "next/navigation";

export async function editProductAction(
    currentProduct: Product,
    _: EditProductFormState,
    formData: FormData,
) {
    try {
        const data = Object.fromEntries(formData);

        const validatedProduct = ProductSchema.parse({
            id: data.id,
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
        });

        if (
            areObjectsEqual(
                ProductSchema.parse(currentProduct),
                validatedProduct,
            )
        )
            return {};

        const productRepository: ProductRepository =
            new MySQLProductRepository();

        await productRepository.update(validatedProduct);
    } catch (e) {
        console.error(e);

        if (e instanceof NotFoundError)
            return {
                errors: { general: "El producto no existe." },
            };

        return {
            errors: {
                general: "Ocurrió un error.",
            },
        };
    }

    redirect("/productos/admin");
}
