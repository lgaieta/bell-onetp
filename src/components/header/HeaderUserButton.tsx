"use client";

import { logoutAction } from "@/services/actions/logoutAction";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

function HeaderUserButton({ isAdmin }: { isAdmin: boolean }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FaUser size={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {!isAdmin && (
                    <DropdownMenuItem asChild className="p-2">
                        <Link href="/compras">Mis compras</Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    className="text-destructive p-2"
                    onClick={() => logoutAction()}
                >
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function ResponsiveHeaderUserButton({ isAdmin }: { isAdmin: boolean }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full">
                    Mi cuenta
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {!isAdmin && (
                    <SheetClose asChild>
                        <DropdownMenuItem asChild className="p-2">
                            <Link href="/compras">Mis compras</Link>
                        </DropdownMenuItem>
                    </SheetClose>
                )}
                <SheetClose asChild>
                    <DropdownMenuItem
                        className="text-destructive p-2"
                        onClick={() => logoutAction()}
                    >
                        Cerrar sesión
                    </DropdownMenuItem>
                </SheetClose>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HeaderUserButton;
