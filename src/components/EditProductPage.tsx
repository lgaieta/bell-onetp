import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Product from "@/models/Product";

export type EditProductPageProps = {
    product: Product;
    formAction: (formData: FormData) => void;
};

async function EditProductPage(props: EditProductPageProps) {
    const { product, formAction } = props;

    return (
        <main className="flex flex-col justify-center items-center px-4 w-full sm:container">
            <header className="flex justify-center py-16">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Editar producto
                </h1>
            </header>
            <form className="grid gap-6 w-full max-w-xl" action={formAction}>
                <div className="grid gap-2">
                    <Label htmlFor="code">Código de producto</Label>
                    <Input
                        id="code"
                        name="id"
                        placeholder="0101010"
                        required
                        disabled
                        type="number"
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
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">
                        Descripción del producto
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="producto"
                        required
                        type="text"
                        defaultValue={product.description}
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
                        defaultValue={product.price}
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
                        defaultValue={product.stock}
                    />
                </div>
                <Button type="submit"> Guardar producto</Button>
            </form>
        </main>
    );
}

export default EditProductPage;
