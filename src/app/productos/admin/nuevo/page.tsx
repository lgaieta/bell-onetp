import CreateProductPage from "@/components/create-product/CreateProductPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cargar producto - bell",
};

export default async function Page() {
    return <CreateProductPage />;
}
