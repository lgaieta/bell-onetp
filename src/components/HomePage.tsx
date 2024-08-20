import Link from "next/link";

type HomePageProps = {};

async function HomePage(props: HomePageProps) {
    return (
        <main className="flex flex-col justify-center w-full ">
            <div className="bg-foreground py-32 px-4 text-white text-center ">
                <h2 className="text-3xl font-semibold mb-4">
                    Explora Nuestros Productos
                </h2>
                <p className="text-lg mb-6">
                    Encuentra el equipo perfecto para tus aventuras al aire
                    libre y disfruta de la naturaleza como nunca antes.
                </p>
                <Link
                    href="/productos"
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                >
                    Ver Productos
                </Link>
            </div>

            <section className="text-foreground py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    ¿Por qué Elegirnos?
                </h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-background p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">Calidad Superior</h3>
                        <p>
                            Seleccionamos solo los mejores productos para
                            garantizar tu satisfacción.
                        </p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">
                            Precios Competitivos
                        </h3>
                        <p>
                            Ofrecemos las mejores ofertas para que puedas
                            disfrutar sin gastar de más.
                        </p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">
                            Envío Rápido y Gratuito
                        </h3>
                        <p>Recibe tu pedido en la puerta de tu casa.</p>
                    </div>
                </div>
            </section>

            <section className="text-foreground py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Lo Que Dicen Nuestros Clientes
                </h2>
                <blockquote className="max-w-4xl mx-auto text-center italic text-gray-600">
                    “Excelente calidad y servicio. ¡Volveré a comprar!” -
                    Cliente Satisfecho
                </blockquote>
                <blockquote className="max-w-4xl mx-auto text-center italic text-gray-600 mt-4">
                    “Los mejores precios y envío rápido. Muy recomendable.” -
                    Cliente Feliz
                </blockquote>
            </section>

            <section className="py-16 px-4 bg-foreground text-white">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Sobre Nosotros
                </h2>
                <p className="max-w-4xl mx-auto text-center">
                    Somos una tienda apasionada por el deporte y la aventura al
                    aire libre. Nuestro objetivo es ofrecerte el mejor
                    equipamiento para que disfrutes al máximo de tus
                    actividades.
                </p>
            </section>

            <section className="text-foreground py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Preguntas Frecuentes
                </h2>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-transparent p-6 rounded-lg shadow mb-4">
                        <h3 className="font-bold">
                            ¿Hacen envíos internacionales?
                        </h3>
                        <p>
                            No, actualmente solo realizamos envíos dentro del
                            país.
                        </p>
                    </div>
                    <div className="bg-transparent p-6 rounded-lg shadow mb-4">
                        <h3 className="font-bold">
                            ¿Cuál es su política de devoluciones?
                        </h3>
                        <p>
                            Aceptamos devoluciones dentro de los 30 días
                            posteriores a la compra.
                        </p>
                    </div>
                    <div className="bg-transparent p-6 rounded-lg shadow mb-4">
                        <h3 className="font-bold">
                            ¿Cómo puedo realizar un pedido?
                        </h3>
                        <p>
                            Para realizar un pedido, selecciona los productos
                            que deseas y agrégales al carrito. Luego, sigue el
                            proceso de pago para completar tu compra.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
