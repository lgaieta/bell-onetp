"use client";

import { logoutAction } from "@/app/iniciar-sesion/logoutAction";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

function HeaderUserButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FaUser size={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild className="p-2">
                    <Link href="/compras">Mis compras</Link>
                </DropdownMenuItem>
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

export default HeaderUserButton;
