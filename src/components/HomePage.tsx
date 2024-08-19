import Image from "next/image";

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
