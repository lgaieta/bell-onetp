import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginPage() {
    return (
        <main className="flex justify-center items-center">
            <form className="grid gap-4">
                <header className="flex justify-center py-16">
                    <h1 className="text-2xl font-bold sm:text-4xl">
                        Inicio de Sesión
                    </h1>
                </header>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="ejemplo@gmail.com"
                        required
                        type="email"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        type="password"
                    />
                </div>
                <Button>Ingresar</Button>
            </form>
        </main>
    );
}

export default LoginPage;
