import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RegisterPageProps = {
    formAction: (formData: FormData) => void;
};

function RegisterPage(props: RegisterPageProps) {
    return (
        <main className="flex flex-col gap-6 md:gap-12 justify-center items-center w-full py-16 px-4 md:py-24">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">Crear cuenta</h1>
            </header>
            <form
                action={props.formAction}
                className="grid gap-5 w-full max-w-sm"
            >
                <div className="grid gap-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Por ejemplo: lgaieta"
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
                <Button type="submit">Crear</Button>
            </form>
        </main>
    );
}

export default RegisterPage;
