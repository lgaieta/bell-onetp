import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import Product from "@/models/Product";

type HomePageProps = {
    products: Product[];
};

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
            <Carousel className="w-full p-4">
                <CarouselContent>
                    {props.products.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
                        >
                            <Card className="p-1">
                                <CardContent className="flex gap-x-10 aspect-square items-center text-center justify-center p-2">
                                    <Link key="products" href="/productos">
                                        {item.name}
                                    </Link>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </main>
    );
}

export default HomePage;
