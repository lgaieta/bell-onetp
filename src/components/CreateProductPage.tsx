function CreateProduct() {
    return (
        <main className="flex w-full min-h-screen flex-col gap-12 items-center py-16">
            <header>
                <h1 className="text-4xl font-bold">Cargar producto</h1>
            </header>
            <div className="flex flex-col w-full gap-6 max-w-sm sm:max-w-xl">
                <div className="flex flex-row justify-between items-center p-6 rounded-lg bg-slate-200 font-semibold  ">
                    <p>Nombre de producto</p>
                    <input type="text" />
                    <p>Codigo de producto</p>
                    <button className=" rounded-lg px-2 font-medium text-white bg-red-500  hover:bg-red-600 ">
                        +
                    </button>
                </div>
            </div>
        </main>
    );
}

export default CreateProduct;
