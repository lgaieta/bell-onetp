import { deleteOrderAction } from "@/app/pedidos/deleteOrderAction";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type CancelOrderDialogProps = {
    orderId: number;
};

function CancelOrderDialog({ orderId }: CancelOrderDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    Cancelar pedido
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Está seguro de querer borrar el pedido Nº{orderId}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción es irreversible, su cliente recibirá un mail
                        con el aviso de que su pedido fue cancelado.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Volver</AlertDialogCancel>
                    <form action={deleteOrderAction.bind(null, orderId)}>
                        <AlertDialogAction
                            type="submit"
                            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive"
                        >
                            Cancelar pedido
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CancelOrderDialog;
