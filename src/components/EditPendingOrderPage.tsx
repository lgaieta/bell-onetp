import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import Order from "@/models/Product";

type EditPendingPageProps = {
    order: Order[];
};

async function EditPendingOrderPage(props: EditPendingPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Editar Pendientes
                </h1>
            </header>
            <div className="flex w-full flex-col gap-y-10 p-4 rounded-md max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                <ul className="flex flex-col w-full gap-6 sm:max-w-xl ">
                    {props.order.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col justify-between p-6 rounded-lg bg-neutral-200 font-semibold  sm:text-sm sm:p-4 sm:flex-row "
                        >
                            <Badge variant="outline" className="bg-green-500">
                                {item.operationState}
                            </Badge>
                            <p>{item.name}</p>
                            <div className="flex flex-col  gap-4">
                                <p>{item.price} $</p>
                                <p>ejemplo@gmail.com</p>
                                <div className="flex gap-2">
                                    <Link
                                        href="/productos/pendientes/editar"
                                        className="transition delay-100  hover:text-gray-500"
                                    >
                                        <MdModeEdit />
                                    </Link>
                                    <Link
                                        href="/productos/pendientes/eliminar"
                                        className="text-red-500 transition delay-100  hover:text-red-600"
                                    >
                                        <MdDelete />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default EditPendingOrderPage;
