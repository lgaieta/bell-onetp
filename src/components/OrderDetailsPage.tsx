import { Badge } from "@/components/ui/badge";

import Order from "@/models/Order";

type OrderDetailsPageProps = {
    order: Order;
};

async function OrderDetailsPage(props: OrderDetailsPageProps) {
    return (
        <div>
            <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
                <header>
                    <h1 className="text-2xl font-bold sm:text-4xl">
                        Pedido pendientes
                    </h1>
                </header>
                <div className="flex w-full flex-col gap-y-10 p-4 rounded-md max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                    <ul className="flex flex-col w-full gap-6 sm:max-w-xl ">
                        <li
                            key={props.order.id}
                            className="flex flex-col justify-between p-6 rounded-lg bg-neutral-100 font-semibold  sm:text-sm sm:p-4 sm:flex-row "
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <p>{props.order.totalPrice} $</p>
                            </div>
                            <Badge
                                key={props.order.id}
                                variant="outline"
                                className="bg-green-500"
                            >
                                {props.order.operationState}
                            </Badge>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default OrderDetailsPage;
