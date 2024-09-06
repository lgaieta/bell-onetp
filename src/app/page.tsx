import HomePage from "@/components/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Equipate para disfrutar - bell - ONETP 2024",
    description: "bell developers",
};

export default async function Page() {
    return <HomePage />;
}
