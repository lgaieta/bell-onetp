import ProductRepository from "@/models/ProductRepository";
import MockProductRepository from "@/services/MockProductRepository";

async function ProductsPage() {
    const productRepository: ProductRepository = new MockProductRepository();
    const list = await productRepository.getList();

    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-2xl font-bold sm:text-4xl">Productos</h1>
            </header>
            <div className="flex flex-col w-full gap-6 max-w-sm sm:max-w-xl">
                {list.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-row justify-between items-center p-6 rounded-lg bg-slate-200 font-semibold  "
                    >
                        {item.name}
                        <button className=" rounded-lg px-2 font-medium text-white bg-red-500  hover:bg-red-600 ">
                            +
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
export default ProductsPage;
