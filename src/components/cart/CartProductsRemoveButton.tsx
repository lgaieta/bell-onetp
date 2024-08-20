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
import { removeFromCartAction } from "@/services/actions/removeFromCartAction";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

type CartProductsRemoveButtonProps = {
    productId: Product["id"];
    onRemove: () => void;
};

function CartProductsRemoveButton({
    productId,
    onRemove,
}: CartProductsRemoveButtonProps) {
    const { toast } = useToast();
    const action = async () => {
        await removeFromCartAction(productId);
        onRemove();
        toast({
            title: "Producto removido del carrito de compras exitosamente.",
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <MdDelete size={24} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Quieres eliminar este producto del carrito?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Podrás agregarlo nuevamente desde la página de
                        productos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={action}>
                        <AlertDialogAction
                            type="submit"
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CartProductsRemoveButton;
