import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
    const errors = {
        username: "El usuario ya existe.",
    }; 

    return (
        <form className="grid gap-5 w-full max-w-sm">
            <div className="grid gap-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="Por ejemplo: tellodev"
                    required
                    className={errors.username && "border-destructive"}
                />
                {errors.username && (
                    <p className="text-sm text-destructive">
                        {errors.username}
                    </p>
                )}
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
    );
}

export default LoginForm;
