import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdShoppingCart } from "react-icons/md";

const links = [
    ["/productos", "Productos"],
    ["/", "Sobre nosotros"],
    ["/pedidos/pendientes", "Mis compras"],
];

function Header() {
    return (
        <header className="bg-background text-foreground sticky top-0 w-full border-b border-b-border">
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
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/">
                            <FaUser size={24} />
                        </Link>
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger>
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
                                <Button
                                    variant="link"
                                    asChild
                                    className="text-foreground py-8 w-full"
                                    key={label}
                                >
                                    <Link href={link}>{label}</Link>
                                </Button>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default Header;
