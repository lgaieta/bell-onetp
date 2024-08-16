import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CreateProductPageProps = {
    formAction: (formData: FormData) => void;
};

function CreateProductPage(props: CreateProductPageProps) {
    return (
        <main className="flex justify-center items-center">
            <form className="grid gap-4" action={props.formAction}>
                <header className="flex justify-center py-16">
                    <h1 className="text-2xl font-bold sm:text-4xl">
                        Cargar producto
                    </h1>
                </header>
                <div className="grid gap-2">
                    <Label htmlFor="code">Código de producto</Label>
                    <Input
                        id="code"
                        name="code"
                        placeholder="12430"
                        required
                        minLength={6}
                        type="number"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre del producto</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Bebida energética"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="Bebida energética"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Precio u.</Label>
                    <Input
                        id="price"
                        name="price"
                        placeholder="$99.99"
                        required
                        step="0.01"
                        type="number"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="stock">Stock (opcional)</Label>
                    <Input
                        id="stock"
                        name="stock"
                        placeholder="10"
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
