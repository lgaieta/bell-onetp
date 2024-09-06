import { ProductsListWithAmount } from "@/components/cart/CartPage";
import { Button } from "@/components/ui/button";
import { initPayment } from "@/services/actions/initPayment";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SiMercadopago } from "react-icons/si";

function CartPaymentButton({ products }: { products: ProductsListWithAmount }) {
    const searchParams = useSearchParams();
    const isAutomaticPay = !!searchParams.get("pay");

    const action = async () => await initPayment(products);

    useEffect(() => {
        if (isAutomaticPay) action();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form action={action}>
            <Button
                className="w-full gap-2 bg:[#4287F5]"
                size="lg"
                disabled={products.length < 1}
                type="submit"
            >
                <SiMercadopago size={24} />
                Pagar con Mercado Pago
            </Button>
        </form>
    );
}

export default CartPaymentButton;
