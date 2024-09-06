import { Button } from "@/components/ui/button";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="flex flex-col justify-end md:justify-center relative w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-[700px]">
                    <Image
                        className="absolute inset-0 w-full h-full object-cover -z-20"
                        src={"/home4-min.webp"}
                        alt=""
                        priority={true}
                        width={1920}
                        height={1080}
                    />
                    <div className="absolute inset-0 bg-foreground opacity-70 -z-10"></div>
                    <div className="container h-full px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <div className="space-y-8 dark">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                                    Equipate para disfrutar
                                </h1>
                                <p className="mx-auto max-w-[700px] text-foreground/90 text-balance md:text-lg">
                                    Descubrí equipamiento deportivo de alta
                                    calidad para elevar tu experiencia. Desde
                                    principiantes hasta profesionales, tenemos
                                    todo lo que necesitás.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button size={"lg"}>Comprar Ahora</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center bg-muted/50 text-foreground">
                    <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-x-12 gap-y-20 px-4 py-36 sm:grid-cols-2 sm:items-start sm:px-6 lg:grid-cols-3 lg:px-8">
                        <li className="flex max-w-xs flex-col items-center gap-3 text-center">
                            <MdOutlineSportsGymnastics
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-balance pt-2 text-lg font-bold">
                                Aventura asegurada
                            </p>
                            <p className="text-balance">
                                Productos diseñados para mejorar tu experiencia
                                al aire libre, brindándote confort y seguridad
                                en cada aventura.
                            </p>
                        </li>
                        <li className="flex max-w-xs flex-col items-center gap-3 text-center">
                            <MdOutlineStar size={40} className="text-primary" />
                            <p className="text-balance pt-2 text-lg font-bold">
                                Calidad garantizada
                            </p>
                            <p className="text-balance">
                                Equipos fabricados con los más altos estándares
                                para ofrecerte durabilidad y rendimiento en
                                condiciones exigentes.
                            </p>
                        </li>
                        <li className="col-auto flex max-w-xs flex-col items-center gap-3 text-center sm:col-span-2 lg:col-auto">
                            <FaHandHoldingHeart
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-balance pt-2 text-lg font-bold">
                                Vos estás primero
                            </p>
                            <p className="text-balance">
                                Sos nuestra prioridad en la marca, estamos
                                dispuestos a responderte cualquier duda sin
                                costo alguno.
                            </p>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
