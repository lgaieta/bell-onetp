import { ProductsListWithAmount } from "@/components/cart/CartPage";
import { Button } from "@/components/ui/button";
import { initPayment } from "@/services/actions/initPayment";
import { SiMercadopago } from "react-icons/si";

function CartPaymentButton({ products }: { products: ProductsListWithAmount }) {
    return (
        <form action={async () => await initPayment(products)}>
            <Button
                className="w-full gap-2 bg:[#4287F5]"
                size="lg"
                disabled={products.length < 1}
            >
                <SiMercadopago size={24} />
                Pagar con Mercado Pago
            </Button>
        </form>
    );
}

export default CartPaymentButton;
