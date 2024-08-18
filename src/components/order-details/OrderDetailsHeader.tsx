type OrderDetailsHeaderProps = {
    orderId: number;
};

function OrderDetailsHeader({ orderId }: OrderDetailsHeaderProps) {
    return (
        <header>
            <h1 className="text-2xl font-bold sm:text-4xl">
                Pedido Nº{orderId}
            </h1>
        </header>
    );
}

export default OrderDetailsHeader;
