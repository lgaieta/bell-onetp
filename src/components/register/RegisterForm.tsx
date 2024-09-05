"use client";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/services/actions/registerUserAction";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

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
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    minLength={8}
                    type="password"
                />
            </div>
            <Button type="submit">Crear</Button>
            {errors?.general && (
                <p className="text-sm text-destructive">{errors.general}</p>
            )}
        </form>
    );
}

export type RegisterFormState = {
    errors?: {
        general?: string;
    };
} | void;

export default RegisterForm;
