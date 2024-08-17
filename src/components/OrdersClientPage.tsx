import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Order from "@/models/Order";
import OrderState from "@/models/OrderState";
import { MdMoreVert } from "react-icons/md";

type OrdersClientPageProps = {
    orders: Order[];
};

const OrderStateColors = {
    [OrderState.Pending]: "bg-[#f59e0b]",
    [OrderState.Canceled]: "bg-[#b91c1c]",
    [OrderState.Delivered]: "bg-[#16a34a]",
    [OrderState.Processed]: "bg-[#0369a1]",
    [OrderState.Shipped]: "bg-[#7c3aed]",
};

const OrderStateLabels = {
    [OrderState.Pending]: "Pendiente",
    [OrderState.Canceled]: "Cancelado",
    [OrderState.Delivered]: "Entregado",
    [OrderState.Processed]: "Procesado",
    [OrderState.Shipped]: "En viaje",
};

async function OrdersClientPage(props: OrdersClientPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Mis compras</h1>
            </header>
            <ul className="flex flex-col items-center justify-center w-full gap-10 px-4 md:max-w-4xl">
                {props.orders.map((order) => (
                    <li key={order.id} className="w-full max-w-sm">
                        <Card
                            className={
                                "hover:bg-muted/20 transition-colors w-full"
                            }
                        >
                            <CardContent className="flex gap-6 p-6 min-[400px]:p-10">
                                <div className="flex flex-col gap-2 w-full">
                                    <Badge
                                        className={cn(
                                            "h-fit w-fit mb-2 text-white",
                                            OrderStateColors[
                                                order.operationState
                                            ],
                                        )}
                                    >
                                        {OrderStateLabels[order.operationState]}
                                    </Badge>
                                    <p className="text-xl font-bold">
                                        Compra Nº{order.id}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Fecha:{" "}
                                        {order.creationTime.toLocaleDateString(
                                            "es-AR",
                                        )}
                                    </p>
                                    <p>Total: ${order.totalPrice}</p>
                                </div>
                                <div className="flex items-start justify-end gap-2">
                                    <Button variant="outline" size="icon">
                                        <MdMoreVert size={24} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default OrdersClientPage;
