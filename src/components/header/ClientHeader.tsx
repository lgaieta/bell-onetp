import { MdMenu, MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import HeaderUserButton, {
    ResponsiveHeaderUserButton,
} from "@/components/header/HeaderUserButton";

const links = [
    ["/productos", "Productos"],
    ["/sobre-nosotros", "Sobre nosotros"],
];

async function ClientHeader() {
    return (
        <header className="bg-background text-foreground sticky top-0 w-full border-b border-b-border z-50">
            <div className="flex gap-8 items-center justify-between md:justify-normal sm:container w-full px-4 h-14">
                <Link href="/" className="tracking-tight text-lg font-bold">
                    bell
                </Link>
                <nav className="hidden md:flex">
                    {links.map(([link, label]) => (
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
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/carrito">
                            <MdShoppingCart size={24} />
                        </Link>
                    </Button>
                    <HeaderUserButton isAdmin={false} />
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
                            {links.map(([link, label]) => (
                                <SheetClose key={label} asChild>
                                    <Button
                                        variant="link"
                                        asChild
                                        className="text-foreground w-full"
                                    >
                                        <Link href={link}>{label}</Link>
                                    </Button>
                                </SheetClose>
                            ))}
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
                            <ResponsiveHeaderUserButton isAdmin={false} />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default ClientHeader;
