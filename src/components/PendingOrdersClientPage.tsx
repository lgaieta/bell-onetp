import { Badge } from "@/components/ui/badge";

import Product from "@/models/Product";

type PendingPageProps = {
    products: Product[];
};

async function PendingOrdersPage(props: PendingPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Pedidos Pendientes
                </h1>
            </header>
            <div className="flex w-full flex-col gap-y-10 p-4 rounded-md max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                <ul className="flex flex-col w-full gap-6 sm:max-w-xl ">
                    {props.products.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col justify-between p-6 rounded-lg bg-neutral-100 font-semibold  sm:text-sm sm:p-4 sm:flex-row "
                        >
                            <p>{item.name}</p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <p>{item.price} $</p>
                                <Badge
                                    variant="outline"
                                    className="bg-green-500"
                                >
                                    <p>Sin entregar</p>
                                </Badge>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default PendingOrdersPage;
