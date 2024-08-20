import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MdShoppingCart } from "react-icons/md";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { Fragment } from "react";
import HeaderUserButton, {
    ResponsiveHeaderUserButton,
} from "@/components/header/HeaderUserButton";

const links = [
    ["/productos", "Productos"],
    ["/", "Sobre nosotros"],
];

const adminLinks = [
    ["/productos/admin", "Productos"],
    ["/pedidos", "Pedidos"],
];

async function Header() {
    const session = await SessionManager.verifySession();
    const isAdmin = session.isAuth && session.type === SessionType.Admin;

    return (
        <header className="bg-background text-foreground sticky top-0 w-full border-b border-b-border z-50">
            <div className="flex gap-8 items-center justify-between md:justify-normal sm:container w-full px-4 h-14">
                <Link href="/" className="tracking-tight text-lg font-bold">
                    bell
                </Link>
                <nav className="hidden md:flex">
                    {(isAdmin ? adminLinks : links).map(([link, label]) => (
                        <Button
                            variant="link"
                            asChild
                            className="text-foreground font-normal"
                            key={label}
                        >
                            <Link href={link}>{label}</Link>
                        </Button>
                    ))}
                </nav>
                <div className="hidden md:flex gap-2 justify-end w-full">
                    {isAdmin ? (
                        <HeaderUserButton />
                    ) : session.isAuth ? (
                        <Fragment>
                            <Button asChild variant="ghost" size="icon">
                                <Link href="/carrito">
                                    <MdShoppingCart size={24} />
                                </Link>
                            </Button>
                            <HeaderUserButton />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button asChild variant="ghost" size="icon">
                                <Link href="/carrito">
                                    <MdShoppingCart size={24} />
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/iniciar-sesion">
                                    Iniciar sesión
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/crear-cuenta">Registrarse</Link>
                            </Button>
                        </Fragment>
                    )}
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
                            {(isAdmin ? adminLinks : links).map(
                                ([link, label]) => (
                                    <SheetClose key={label} asChild>
                                        <Button
                                            variant="link"
                                            asChild
                                            className="text-foreground w-full"
                                        >
                                            <Link href={link}>{label}</Link>
                                        </Button>
                                    </SheetClose>
                                ),
                            )}
                            {isAdmin ? (
                                <SheetClose asChild>
                                    <ResponsiveHeaderUserButton />
                                </SheetClose>
                            ) : session.isAuth ? (
                                <Fragment>
                                    <SheetClose asChild>
                                        <Button asChild>
                                            <Link
                                                href="/carrito"
                                                className="flex gap-2"
                                            >
                                                Mi carrito
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                    <ResponsiveHeaderUserButton />
                                </Fragment>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <SheetClose asChild>
                                        <Button
                                            variant="link"
                                            asChild
                                            className="text-foreground w-full"
                                        >
                                            <Link
                                                href="/carrito"
                                                className="flex gap-2"
                                            >
                                                Mi carrito
                                            </Link>
                                        </Button>
                                    </SheetClose>
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
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default Header;