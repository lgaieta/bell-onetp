import Link from "next/link";

function Footer() {
    return (
        <footer className="flex flex-col justify-center  w-full gap-y-4 bg-foreground text-white p-8 sm:flex-row sm:gap-x-24">
            <div className="flex flex-col gap-4 font-bold">
                <p>Contacto</p>
                <div className=" flex flex-col gap-2 text-xs font-semibold">
                    <p>lgaieta@gmail.com</p>
                    <p>eliastello.dev@gmail.com</p>
                    <p>tuillierbrian333@gmail.com</p>
                    <p>lautarocas05@gmail.com</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 font-bold">
                <p>Secciones</p>
                <div className="flex flex-col gap-2 text-xs font-semibold">
                    <Link href="/productos">Productos</Link>
                    <Link href="/pedidos">Pedidos</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
