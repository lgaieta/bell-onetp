import Order from "@/models/Order";
import { Button } from "@/components/ui/button";
import OrderStateBadge, {
    OrderStateColors,
    OrderStateLabels,
} from "@/components/ui/order-state-badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableRow, TableCell } from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import OrderState from "@/models/OrderState";
import { editOrderStateAction } from "@/app/pedidos/editOrderStateAction";

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
            <TableCell className="flex gap-2">
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Opciones</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <DialogTrigger>Editar estado</DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Ver productos</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                Cancelar pedido
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="p-8 rounded-2xl">
                        <DialogTitle className="text-xl md:text-2xl text-center mb-2">
                            Elige el nuevo estado
                        </DialogTitle>
                        <div className="flex flex-col gap-2 w-full max-w-md">
                            {Object.entries(OrderStateLabels).map(
                                ([key, label]) => (
                                    <DialogClose key={key}>
                                        <form
                                            action={editOrderStateAction.bind(
                                                null,
                                                order.id,
                                                key as OrderState,
                                            )}
                                        >
                                            <Button
                                                size="lg"
                                                className={
                                                    "w-full text-white " +
                                                    OrderStateColors[
                                                        key as OrderState
                                                    ]
                                                }
                                            >
                                                {label}
                                            </Button>
                                        </form>
                                    </DialogClose>
                                ),
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}

export default OrderTableRow;
