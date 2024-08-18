import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderStateBadge, {
    OrderStateLabels,
} from "@/components/ui/order-state-badge";
import Order from "@/models/Order";

type OrderDetailsCardProps = {
    order: Order;
};

function OrderDetailsCard({ order }: OrderDetailsCardProps) {
    return (
        <Card>
            <CardContent className="p-8 flex flex-col gap-7">
                <CardHeader className="p-0">
                    <CardTitle>Datos de la compra</CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Nº Pedido:</p>
                        <p>{order.id}</p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Usuario:</p>
                        <p>{order.username}</p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Total:</p>
                        <p>${order.totalPrice}</p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Estado:</p>
                        <OrderStateBadge state={order.operationState} />
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Fecha de Creación:</p>
                        <p>
                            {new Date(order.creationTime).toLocaleDateString(
                                "es-AR",
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="font-bold">Cantidad de productos:</p>
                        <p>{Object.keys(order.products).length}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default OrderDetailsCard;
