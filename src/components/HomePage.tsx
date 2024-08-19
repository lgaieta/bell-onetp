import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import Product from "@/models/Product";

type HomePageProps = {};

async function HomePage(props: HomePageProps) {
    return (
        <main className="flex flex-col justify-center w-full ">
            <div>
                <Image
                    src="/stock.jpeg"
                    width={700}
                    height={700}
                    priority={true}
                    alt="Stock image"
                    className="w-full object-cover"
                />
            </div>
        </main>
    );
}

export default HomePage;
