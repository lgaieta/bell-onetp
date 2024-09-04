"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Product from "@/models/Product";
import { addToCartAction } from "@/services/actions/addToCartAction";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MdAddShoppingCart } from "react-icons/md";

export default function AddToCartButton({
    productId,
}: {
    productId: Product["id"];
}) {
    const { pending } = useFormStatus();
    const { toast } = useToast();

    const action = async () => {
        await addToCartAction(productId);
        toast({
            description: "Producto agregado al carrito exitosamente",
            action: (
                <ToastAction altText="Ver carrito" asChild>
                    <Link href="/carrito">Ver carrito</Link>
                </ToastAction>
            ),
        });
    };

    return (
        <Button
            type="submit"
            formAction={action}
            size="icon"
            variant="outline"
            disabled={pending}
            aria-label="Añadir al carrito"
        >
            {pending ? (
                <Loader2 className="size-6 animate-spin" />
            ) : (
                <MdAddShoppingCart size={24} />
            )}
        </Button>
    );
}
