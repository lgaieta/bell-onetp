"use client";
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
import { useToast } from "@/components/ui/use-toast";
import Product from "@/models/Product";
import { deleteProductAction } from "@/services/actions/deleteProductAction";
import { removeFromCartAction } from "@/services/actions/removeFromCartAction";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { MdDelete } from "react-icons/md";

type RemoveProductButtonProps = {
    productId: Product["id"];
    onRemove?: () => void;
};

function RemoveProductButton({
    productId,
    onRemove,
}: RemoveProductButtonProps) {
    const { toast } = useToast();
    const action = async () => {
        await deleteProductAction(productId, new FormData());
        onRemove?.();
        toast({
            title: "Producto eliminado exitosamente.",
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div>
                    <SubmitButton />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Quieres eliminar este producto?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        No podrás revertir esta acción, en todo caso se deberá
                        crear uno nuevo.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <form action={action}>
                        <AlertDialogAction
                            type="submit"
                            className="w-full bg-destructive text-destructive-foreground lg:w-fit hover:bg-destructive/90"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" size="icon" disabled={pending}>
            {pending ? (
                <Loader2 className="size-6 animate-spin" />
            ) : (
                <MdDelete size={24} className="text-destructive" />
            )}
        </Button>
    );
}

export default RemoveProductButton;
