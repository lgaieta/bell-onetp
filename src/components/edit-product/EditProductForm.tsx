"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Product from "@/models/Product";
import { editProductAction } from "@/services/actions/editProductAction";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function EditProductForm({ product }: { product: Product }) {
    const [state, formAction] = useFormState<EditProductFormState, FormData>(
        editProductAction.bind(null, product),
        {},
    );

    const errors = state?.errors;

    return (
        <form className="grid gap-6 w-full max-w-xl" action={formAction}>
            <div className="grid gap-2">
                <Label htmlFor="code">Código de producto</Label>
                <Input
                    id="code"
                    name="id"
                    placeholder="0101010"
                    required
                    defaultValue={product.id}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre del producto</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="producto"
                    required
                    type="text"
                    defaultValue={product.name}
                    className={errors?.name && "border-destructive"}
                />
                {errors?.name && (
                    <p className="text-sm text-destructive">{errors?.name}</p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descripción del producto</Label>
                <Input
                    id="description"
                    name="description"
                    placeholder="producto"
                    required
                    type="text"
                    defaultValue={product.description}
                    className={errors?.description && "border-destructive"}
                />
                {errors?.description && (
                    <p className="text-sm text-destructive">
                        {errors?.description}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="price">Precio unitario</Label>
                <Input
                    id="price"
                    name="price"
                    placeholder="$99.99"
                    required
                    type="number"
                    defaultValue={product.price}
                    className={errors?.price && "border-destructive"}
                />
                {errors?.price && (
                    <p className="text-sm text-destructive">{errors?.price}</p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                    id="stock"
                    name="stock"
                    placeholder="123"
                    required
                    type="number"
                    defaultValue={product.stock}
                    className={errors?.stock && "border-destructive"}
                />
                {errors?.stock && (
                    <p className="text-sm text-destructive">{errors?.stock}</p>
                )}
            </div>
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors?.general}
                </p>
            )}
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar producto"}
        </Button>
    );
}

export type EditProductFormState = {
    errors?: {
        general?: string;
        name?: string;
        description?: string;
        price?: string;
        stock?: string;
    };
} | void;

export default EditProductForm;
