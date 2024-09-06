import AdminHeader from "@/components/header/AdminHeader";
import ClientHeader from "@/components/header/ClientHeader";
import DefaultHeader from "@/components/header/DefaultHeader";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";

async function Header() {
    const session = await SessionManager.verifySession();
    const isAdmin = session.isAuth && session.type === SessionType.Admin;

    if (isAdmin) return <AdminHeader />;
    else if (session.isAuth) return <ClientHeader />;
    else return <DefaultHeader />;
}

export default Header;
