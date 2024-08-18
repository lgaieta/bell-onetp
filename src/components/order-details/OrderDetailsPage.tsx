import Order from "@/models/Order";
import OrderDetailsHeader from "@/components/order-details/OrderDetailsHeader";
import OrderActionsCard from "@/components/order-details/OrderActionsCard";
import OrderDetailsCard from "@/components/order-details/OrderDetailsCard";
import Product from "@/models/Product";
import OrderProductsCard from "@/components/order-details/OrderProductsCard";

type OrderDetailsPageProps = {
    order: Order;
    products: Product[];
};

async function OrderDetailsPage({ order, products }: OrderDetailsPageProps) {
    return (
        <div>
            <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
                <OrderDetailsHeader orderId={order.id} />
                <div className="grid w-full gap-10 container grid-cols-1 sm:grid-cols-3 sm:flex-row sm:justify-between">
                    <div className="flex flex-col gap-6 w-full">
                        <OrderDetailsCard order={order} />
                        <OrderActionsCard order={order} />
                    </div>
                    <div className="sm:col-span-2 w-full">
                        <OrderProductsCard
                            productAmounts={order.products}
                            products={products}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OrderDetailsPage;
