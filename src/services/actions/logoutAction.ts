"use server";

import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export async function logoutAction() {
    SessionManager.deleteSession();
    redirect("/");
}
