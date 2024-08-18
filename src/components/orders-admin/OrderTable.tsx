import Order from "@/models/Order";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import OrderTableRow from "@/components/orders-admin/OrderTableRow";
import OrderState from "@/models/OrderState";

type OrderTableProps = {
    orders: Order[];
};

function OrderTable({ orders }: OrderTableProps) {
    return (
        <div className="w-full border border-border rounded-2xl">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nº Orden</TableHead>
                        <TableHead>Comprador</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <OrderTableRow key={order.id} order={order} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default OrderTable;
