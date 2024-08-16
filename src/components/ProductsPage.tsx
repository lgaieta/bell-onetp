import { IoAdd } from "react-icons/io5";

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

type ProductsPageProps = {
    products: Product[];
};

async function ProductsPage(props: ProductsPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Productos</h1>
            </header>
            <div className="flex flex-col w-full gap-6 max-w-sm sm:max-w-xl">
                {props.products.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-row justify-between items-center p-6 rounded-lg bg-neutral-100 font-semibold  "
                    >
                        {item.name}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <div className=" rounded-md p-1  font-medium text-white bg-red-500  hover:bg-red-600 ">
                                    <IoAdd />
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Quieres agregar este producto al
                                        carrito?
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </div>
        </main>
    );
}
export default ProductsPage;
