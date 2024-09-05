import { MdDelete, MdEdit } from "react-icons/md";
import Product from "@/models/Product";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteProductAction } from "@/services/actions/deleteProductAction";

type ProductsAdminPageProps = {
    products: Product[];
    onDeleteProductAction: (id: Product["id"], formData: FormData) => void;
};

async function ProductsAdminPage(props: ProductsAdminPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center container py-16">
            <header className="flex flex-col gap-10">
                <h1 className="text-2xl font-bold sm:text-4xl text-center">
                    Productos
                </h1>
                <Button asChild>
                    <Link href="/productos/admin/nuevo">Nuevo producto</Link>
                </Button>
            </header>
            <div className="w-full border border-border rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Código</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead> </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                    {product.id}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="text-right">
                                    {product.price}
                                </TableCell>
                                <TableCell className="text-right">
                                    {product.stock}
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        type="submit"
                                        size="icon"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link
                                            href={`/productos/admin/editar/${product.id}`}
                                        >
                                            <MdEdit size={24} />
                                        </Link>
                                    </Button>
                                    <form
                                        action={deleteProductAction.bind(
                                            null,
                                            product.id,
                                        )}
                                    >
                                        <Button
                                            type="submit"
                                            size="icon"
                                            variant="outline"
                                        >
                                            <MdDelete
                                                className="text-destructive"
                                                size={24}
                                            />
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
}
export default ProductsAdminPage;
