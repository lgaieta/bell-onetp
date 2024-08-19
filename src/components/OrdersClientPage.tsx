import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrderStateBadge from "@/components/ui/order-state-badge";
import Order from "@/models/Order";
import { MdMoreVert } from "react-icons/md";

type OrdersClientPageProps = {
    orders: Order[];
};

async function OrdersClientPage(props: OrdersClientPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Mis compras</h1>
            </header>
            <ul className="flex flex-col items-center justify-center w-full gap-10 px-4 md:max-w-4xl">
                {props.orders.length === 0 && (
                    <p className="text-center max-w-sm text-muted-foreground">
                        Parece que no has hecho ninguna compra, para realizar
                        una debes seleccionar los productos e ir al carrito para
                        comenzar la compra.
                    </p>
                )}
                {props.orders.map((order) => (
                    <li key={order.id} className="w-full max-w-sm">
                        <Card
                            className={
                                "hover:bg-muted/20 transition-colors w-full"
                            }
                        >
                            <CardContent className="flex gap-6 p-6 min-[400px]:p-10">
                                <div className="flex flex-col gap-2 w-full">
                                    <OrderStateBadge
                                        state={order.operationState}
                                    />
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
