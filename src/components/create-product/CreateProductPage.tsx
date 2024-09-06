import CreateProductForm from "@/components/create-product/CreateProductForm";

function CreateProductPage() {
    return (
        <main className="flex flex-col gap-12 justify-center items-center py-24 px-4 w-full sm:container">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Cargar producto
                </h1>
            </header>
            <CreateProductForm />
        </main>
    );
}

export default CreateProductPage;
