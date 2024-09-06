import { Button } from "@/components/ui/button";
import Link from "next/link";

function Footer() {
    return (
        <footer className="flex flex-col justify-center w-full items-center gap-y-4 bg-foreground text-white p-8 sm:flex-row sm:gap-x-24">
            <div className="flex flex-col gap-8 font-bold md:flex-row max-w-xl w-full justify-between">
                <div className="flex flex-col gap-2 w-full font-semibold">
                    <p className="font-bold">Contactanos</p>
                    <p className="text-sm">lgaieta.dev@gmail.com</p>
                    <Link href="" className="text-sm">
                        Nuestro WhatsApp
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full font-semibold">
                    <p className="font-2xl font-bold text-center">bell</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
