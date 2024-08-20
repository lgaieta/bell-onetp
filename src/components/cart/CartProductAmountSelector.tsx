"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

type CartProductAmountSelectorProps = {
    onAmountChange: (newNumber: number) => void;
    amount: number;
};

function CartProductAmountSelector(props: CartProductAmountSelectorProps) {
    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="outline"
                onClick={() => props.onAmountChange(props.amount - 1)}
                disabled={props.amount < 2}
            >
                <MdRemove size={24} />
            </Button>
            <Button
                size="icon"
                variant="outline"
                onClick={() => props.onAmountChange(props.amount + 1)}
            >
                <MdAdd size={24} />
            </Button>
        </div>
    );
}

export default CartProductAmountSelector;
