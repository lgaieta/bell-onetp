"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/services/actions/loginAction";
import { useFormState, useFormStatus } from "react-dom";

function LoginForm() {
    const [state, formAction] = useFormState<LoginFormState, FormData>(
        loginAction,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <div className="grid gap-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="Por ejemplo: lgaieta"
                    className={errors.username && "border-destructive"}
                    minLength={6}
                    maxLength={16}
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
                    minLength={6}
                    maxLength={65}
                    type="password"
                    className={errors.username && "border-destructive"}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}
            </div>
            <SubmitButton />
            {errors.general && (
                <p className="text-sm text-destructive">{errors.general}</p>
            )}
        </form>
    );
}

export type LoginFormState = {
    errors: {
        general?: string;
        username?: string;
        password?: string;
    };
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Ingresando..." : "Ingresar"}
        </Button>
    );
}

export default LoginForm;
