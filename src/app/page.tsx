import CartPage from "@/components/CartPage";
import CreateProductPage from "@/components/CreateProductPage";
import EditProductPage from "@/components/EditProductPage";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import ProductsPage from "@/components/ProductsPage";
import RegisterPage from "@/components/RegisterPage";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            <ProductsPage />
        </main>
    );
}
