import Order from "@/models/Order";
import OrdersAdminPageHeader from "./OrdersAdminPageHeader";
import OrderTable from "./OrderTable";

type OrdersAdminPageProps = {
    orders: Order[];
};

function OrdersAdminPage({ orders }: OrdersAdminPageProps) {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center container py-16">
            <OrdersAdminPageHeader />
            <OrderTable orders={orders} />
        </main>
    );
}

export default OrdersAdminPage;
