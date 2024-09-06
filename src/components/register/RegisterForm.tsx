"use client";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/services/actions/registerUserAction";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";

function RegisterForm() {
    const [state, formAction] = useFormState<RegisterFormState, FormData>(
        registerUserAction,
        {
            errors: {},
        },
    );
    const errors = state?.errors;

    return (
        <form action={formAction} className="grid gap-5 w-full max-w-sm">
            <div className="grid gap-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="Por ejemplo: lgaieta"
                    minLength={6}
                    maxLength={16}
                    required
                />
                {errors?.username && (
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
                    minLength={8}
                    maxLength={65}
                    type="password"
                />
                {errors?.password && (
                    <p className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}
            </div>
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive">{errors.general}</p>
            )}
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creando..." : "Crear"}
        </Button>
    );
}

export type RegisterFormState = {
    errors?: {
        general?: string;
        username?: string;
        password?: string;
    };
} | void;

export default RegisterForm;
