import { editOrderStateAction } from "@/app/pedidos/editOrderStateAction";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    OrderStateLabels,
    OrderStateColors,
} from "@/components/ui/order-state-badge";
import Order from "@/models/Order";
import OrderState from "@/models/OrderState";

type EditOrderStateDialogProps = {
    order: Order;
};

function EditOrderStateDialog({ order }: EditOrderStateDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Editar estado</Button>
            </DialogTrigger>
            <DialogContent className="p-8 rounded-2xl">
                <DialogTitle className="text-xl md:text-2xl text-center mb-2">
                    Elige el nuevo estado
                </DialogTitle>
                <div className="flex flex-col gap-2 w-full max-w-md">
                    {Object.entries(OrderStateLabels)
                        .filter(([key]) => key !== OrderState.Canceled)
                        .map(([key, label]) => (
                            <DialogClose key={key} asChild>
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
                                            OrderStateColors[key as OrderState]
                                        }
                                    >
                                        {label}
                                    </Button>
                                </form>
                            </DialogClose>
                        ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditOrderStateDialog;
