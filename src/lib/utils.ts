import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateResponseError(body: any, init?: ResponseInit) {
    return Response.json(body, {
        status: 500,
        ...init,
    });
}
