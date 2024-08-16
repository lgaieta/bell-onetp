import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

async function PendingOrdersPage() {
    const productRepository: ProductRepository = new MockProductRepository();
    const list = await productRepository.getList();

    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Productos Pendientes
                </h1>
            </header>
            <div className="flex w-full flex-col gap-y-10 p-4 bg-neutral-100 max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                <ul className="flex flex-col w-full gap-6 sm:max-w-xl ">
                    {list.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col justify-between p-6 rounded-lg  font-semibold  sm:text-sm sm:p-4 sm:flex-row "
                        >
                            <p>{item.name}</p>
                            <div className="flex gap-3">
                                <p>{item.price} $</p>
                                <p>ejemplo@gmail.com</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default PendingOrdersPage;
