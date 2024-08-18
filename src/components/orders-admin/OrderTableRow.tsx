import Order from "@/models/Order";
import { Button } from "@/components/ui/button";
import OrderStateBadge from "@/components/ui/order-state-badge";
import { TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
type OrderTableRowProps = {
    order: Order;
};

function OrderTableRow({ order }: OrderTableRowProps) {
    return (
        <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.username}</TableCell>
            <TableCell className="text-right">${order.totalPrice}</TableCell>
            <TableCell className="flex items-center">
                <OrderStateBadge state={order.operationState} />
            </TableCell>
            <TableCell>
                {order.creationTime.toLocaleDateString("es-AR")}
            </TableCell>
            <TableCell className="flex">
                <Button variant="outline">
                    <Link href={`/pedidos/${order.id}`}>Ver detalles</Link>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default OrderTableRow;
