import { MdMenu, MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

function DefaultHeader() {
    return (
        <header className="bg-background text-foreground sticky top-0 w-full border-b border-b-border z-50">
            <div className="flex gap-8 items-center justify-between md:justify-normal sm:container w-full px-4 h-14">
                <Link href="/" className="tracking-tight text-lg font-bold">
                    bell
                </Link>
                <nav className="hidden md:flex">
                    <Button
                        variant="link"
                        asChild
                        className="text-foreground font-normal"
                        key="productos"
                    >
                        <Link href="/productos">Productos</Link>
                    </Button>
                    <Button
                        variant="link"
                        asChild
                        className="text-foreground font-normal"
                        key="sobre-nosotros"
                    >
                        <Link href="/">Sobre nosotros</Link>
                    </Button>
                </nav>
                <div className="hidden md:flex gap-2 justify-end w-full">
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/carrito">
                            <MdShoppingCart size={24} />
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/iniciar-sesion">Iniciar sesión</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/crear-cuenta">Registrarse</Link>
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="md:hidden"
                            variant="outline"
                            size="icon"
                        >
                            <MdMenu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <nav className="flex flex-col">
                            <SheetClose asChild>
                                <Button
                                    variant="link"
                                    asChild
                                    className="text-foreground w-full"
                                >
                                    <Link href="/productos">Productos</Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button
                                    variant="link"
                                    asChild
                                    className="text-foreground w-full"
                                >
                                    <Link href="/">Sobre nosotros</Link>
                                </Button>
                            </SheetClose>
                            <div className="flex flex-col gap-2">
                                <SheetClose asChild>
                                    <Button asChild variant="outline">
                                        <Link href="/iniciar-sesion">
                                            Iniciar sesión
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button asChild>
                                        <Link href="/crear-cuenta">
                                            Registrarse
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default DefaultHeader;
