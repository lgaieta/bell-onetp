import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

async function PendingProductsPage() {
    const productRepository: ProductRepository = new MockProductRepository();
    const list = await productRepository.getList();

    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Productos Pendientes
                </h1>
            </header>
            <div className="flex w-full flex-col gap-y-10 px-4 max-w-sm sm:max-w-xl sm:flex-row sm:justify-between ">
                <div className="flex flex-col w-full gap-6 sm:max-w-xs ">
                    {list.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-row justify-between p-6 rounded-lg bg-slate-100 font-semibold sm:text-sm sm:p-4 "
                        >
                            {item.name}
                            <div className="flex flex-row gap-x-6">
                                <p>{item.price} $</p>
                                <button className="font-medium rounded-md px-2 text-red-500 hover:text-white hover:bg-red-600 ">
                                    x
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default PendingProductsPage;
