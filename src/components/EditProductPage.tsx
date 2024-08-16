import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Product from "@/models/Product";

export type EditProductPageProps = {
    product: Product;
    formAction: () => void;
};

async function EditProductPage(props: EditProductPageProps) {
    const { product } = props;

    return (
        <form className="grid gap-4">
            <header className="flex justify-center py-16">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Editar producto
                </h1>
            </header>
            <div className="grid gap-2">
                <Label htmlFor="text">Nombre del producto</Label>
                <Input
                    id="name"
                    name="product"
                    placeholder="producto"
                    required
                    type="text"
                    defaultValue={product.name}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Código de producto</Label>
                <Input
                    id="code"
                    name="code"
                    placeholder="0101010"
                    required
                    minLength={6}
                    type="number"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="text">Precio u.</Label>
                <Input
                    id="price"
                    name="price"
                    placeholder="$99.99"
                    required
                    type="number"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="text">Stock</Label>
                <Input
                    id="stock"
                    name="stock"
                    placeholder="123"
                    required
                    type="number"
                />
            </div>
            <Button> Guardar producto</Button>
        </form>
    );
}

export default EditProductPage;
