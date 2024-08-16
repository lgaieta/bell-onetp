import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CreateProductPage() {
    return (
        <main className="flex justify-center items-center">
            <form className="grid gap-4">
                <header className="flex justify-center py-16">
                    <h1 className="text-2xl font-bold sm:text-4xl">
                        Cargar producto
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
                    <Label htmlFor="text">Stock(opcional)</Label>
                    <Input
                        id="stock"
                        name="stock"
                        placeholder="123"
                        required
                        type="number"
                    />
                </div>
                <Button> Cargar producto</Button>
            </form>
        </main>
    );
}

export default CreateProductPage;
