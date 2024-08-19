"use client";
import { Button } from "@/components/ui/button";
import Product from "@/models/Product";
import { addToCartAction } from "@/services/actions/addToCartAction";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MdAddShoppingCart } from "react-icons/md";

export default function AddToCartButton({
    productId,
}: {
    productId: Product["id"];
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            formAction={addToCartAction.bind(null, productId)}
            size="icon"
            variant="outline"
            disabled={pending}
        >
            {pending ? (
                <Loader2 className="size-6 animate-spin" />
            ) : (
                <MdAddShoppingCart size={24} />
            )}
        </Button>
    );
}
