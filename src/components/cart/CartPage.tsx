import { MdDelete } from "react-icons/md";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Product from "@/models/Product";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import ProductItem from "@/components/ui/product-item";
import CartSummary from "@/components/cart/CartSummary";

type CartPageProps = {
    productsList: Product[];
    onRemoveProductFromCart: (id: Product["id"], formData: FormData) => void;
};

async function CartPage(props: CartPageProps) {
    return (
        <main className="flex w-full flex-col gap-16 items-center py-16 container">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Carrito de compras
                </h1>
            </header>
            <div className="grid w-full gap-10 grid-cols-1 md:grid-cols-3 sm:flex-row sm:justify-between">
                <CartSummary productsList={props.productsList} />
                <Card className="flex justify-center w-full rounded-xl bg-muted/40 md:col-span-2 p-6 md:p-16">
                    {props.productsList.length > 0 ? (
                        <div className="flex flex-col gap-6 w-full">
                            {props.productsList.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    endContent={
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <MdDelete size={24} />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        ¿Quieres eliminar este
                                                        producto del carrito?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Podrás agregarlo
                                                        nuevamente desde la
                                                        página de productos.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <form
                                                        action={props.onRemoveProductFromCart.bind(
                                                            null,
                                                            product.id,
                                                        )}
                                                    >
                                                        <AlertDialogAction
                                                            type="submit"
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Eliminar
                                                        </AlertDialogAction>
                                                    </form>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8 justify-center items-center w-full text-center">
                            <p>
                                Parece que no hay ningun producto en tu carrito.
                            </p>
                            <Button asChild>
                                <Link href="/productos">Ir a productos</Link>
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </main>
    );
}

export default CartPage;
