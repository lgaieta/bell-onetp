"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { createProductAction } from "@/services/actions/createProductAction";

function CreateProductForm() {
    return (
        <form
            className="grid gap-6 w-full max-w-xl"
            action={createProductAction}
        >
            <div className="grid gap-2">
                <Label htmlFor="code">Código de producto</Label>
                <Input id="code" name="id" placeholder="1A2B3C4D" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre del producto</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="producto"
                    required
                    type="text"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descripción del producto</Label>
                <Input
                    id="description"
                    name="description"
                    placeholder="producto"
                    required
                    type="text"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="price">Precio unitario</Label>
                <Input
                    id="price"
                    name="price"
                    placeholder="$99.99"
                    required
                    type="number"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                    id="stock"
                    name="stock"
                    placeholder="123"
                    required
                    type="number"
                />
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Cargando..." : "Cargar producto"}
        </Button>
    );
}

export default CreateProductForm;
