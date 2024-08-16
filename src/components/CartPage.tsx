import ProductRepository from "@/models/ProductRepository";

import MockProductRepository from "@/services/MockProductRepository";
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

async function CartPage() {
    const productRepository: ProductRepository = new MockProductRepository();
    const list = await productRepository.getList();

    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Carrito de compras
                </h1>
            </header>
            <div className="flex w-full flex-col gap-y-10 px-4 max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                <div className="flex flex-col rounded-md sm:w-1/3 ">
                    <p className="text-xl font-bold mx-2 mt-4  ">Resumen</p>
                    <div className="flex flex-row justify-between p-2 font-semibold bg-neutral-100 rounded-t-md">
                        <p>Total</p>
                        <p>$1000</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <p className=" w-full py-4 text-2xl text-white font-semibold rounded-b-md bg-red-500 hover:bg-red-600">
                                Pagar
                            </p>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Quieres realizar el pago?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="flex flex-col w-full gap-6 sm:max-w-xs ">
                    {list.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-row justify-between p-6 rounded-lg bg-neutral-100 font-semibold sm:text-sm sm:p-4 "
                        >
                            {item.name}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className=" rounded-md p-1  font-medium text-red-500 hover:text-white  hover:bg-red-500 ">
                                        <MdDelete />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            ¿Quieres eliminar este producto del
                                            carrito?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default CartPage;
