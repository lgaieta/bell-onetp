import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginPageProps = {
    formAction: (formData: FormData) => void;
};

function LoginPage(props: LoginPageProps) {
    return (
        <main className="flex flex-col gap-6 md:gap-12 justify-center items-center w-full py-16 px-4 md:py-24">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Iniciar sesión
                </h1>
            </header>
            <form
                className="grid gap-5 w-full max-w-md"
                action={props.formAction}
            >
                <div className="grid gap-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="ejemplo@bell.com"
                        required
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
                <Button type="submit">Ingresar</Button>
            </form>
        </main>
    );
}

export default LoginPage;
