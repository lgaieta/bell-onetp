import Order from "@/models/Order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditOrderStateDialog from "@/components/order-details/EditOrderStateDialog";
import CancelOrderDialog from "@/components/order-details/CancelOrderDialog";

type OrderActionsCardProps = {
    order: Order;
};

function OrderActionsCard({ order }: OrderActionsCardProps) {
    return (
        <Card className="w-full justify-self-center">
            <CardContent className="flex flex-col gap-4 w-full p-8 sm:p-4 lg:p-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-lg lg:text-xl text-center">
                        Acciones
                    </CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-2 w-full min-[460px]:flex-row sm:flex-col lg:flex-row">
                    <EditOrderStateDialog order={order} />
                    <CancelOrderDialog orderId={order.id} />
                </div>
            </CardContent>
        </Card>
    );
}

export default OrderActionsCard;
