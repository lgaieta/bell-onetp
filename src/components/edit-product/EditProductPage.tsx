import Product from "@/models/Product";
import EditProductForm from "@/components/edit-product/EditProductForm";

export type EditProductPageProps = {
    product: Product;
};

async function EditProductPage(props: EditProductPageProps) {
    const { product } = props;

    return (
        <main className="flex flex-col gap-12 justify-center items-center py-24 px-4 w-full sm:container">
            <header className="flex justify-center ">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Editar producto
                </h1>
            </header>
            <EditProductForm product={product} />
        </main>
    );
}

export default EditProductPage;
