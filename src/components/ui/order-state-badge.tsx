import { cn } from "@/lib/utils";
import OrderState from "@/models/OrderState";
import { Badge } from "@/components/ui/badge";

export const OrderStateColors: { [index in OrderState]: string } = {
    [OrderState.Pending]: "bg-[#ea580c] hover:bg-[#ea580c]",
    [OrderState.Canceled]: "bg-[#b91c1c] hover:bg-[#b91c1c]",
    [OrderState.Processed]: "bg-[#0369a1] hover:bg-[#0369a1]",
    [OrderState.Shipped]: "bg-[#7c3aed] hover:bg-[#7c3aed]",
    [OrderState.Delivered]: "bg-[#16a34a] hover:bg-[#16a34a]",
};

export const OrderStateLabels: { [index in OrderState]: string } = {
    [OrderState.Pending]: "Pendiente",
    [OrderState.Canceled]: "Cancelado",
    [OrderState.Processed]: "Procesado",
    [OrderState.Shipped]: "En viaje",
    [OrderState.Delivered]: "Entregado",
};

function OrderStateBadge(props: { state: OrderState }) {
    return (
        <Badge
            className={cn(
                "h-fit w-fit text-white",
                OrderStateColors[props.state],
            )}
        >
            {OrderStateLabels[props.state]}
        </Badge>
    );
}

export default OrderStateBadge;
