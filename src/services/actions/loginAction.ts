"use server";
import { LoginFormState } from "@/components/login/LoginForm";
import NotFoundError from "@/lib/NotFoundError";
import strings from "@/lib/strings";
import UserRepository from "@/models/UserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import {
    UserUsernameSchema,
    UserPasswordSchema,
} from "@/services/schemas/UserSchema";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";

export async function loginAction(
    pay: boolean = false,
    _: LoginFormState,
    formData: FormData,
    userRepository: UserRepository = new MySQLUserRepository(),
    passwordEncrypter = PasswordEncrypter,
    sessionManager = SessionManager,
) {
    const data = Object.fromEntries(formData);

    const validatedUsername = UserUsernameSchema.safeParse(data.username);
    const validatedPassword = UserPasswordSchema.safeParse(data.password);

    if (!validatedUsername.success || !validatedPassword.success) {
        return {
            errors: {
                username: !validatedUsername.success
                    ? strings.user.login.invalid_username
                    : undefined,
                password: !validatedPassword.success
                    ? strings.user.login.invalid_password
                    : undefined,
            },
        };
    }

    const isAdmin =
        validatedPassword.data === process.env.ADMIN_PASSWORD &&
        validatedUsername.data === process.env.ADMIN_USER;

    if (isAdmin) {
        await sessionManager.createSession(
            validatedUsername.data,
            SessionType.Admin,
        );
        return redirect("/");
    }

    try {
        const savedUser = await userRepository.getByUsername(
            validatedUsername.data,
        );
        if (!savedUser) {
            return {
                errors: {
                    username: strings.user.login.user_not_found,
                },
            };
        }

        const passwordValid = await passwordEncrypter.compare(
            validatedPassword.data,
            savedUser.password,
        );

        if (!passwordValid) {
            return {
                errors: {
                    general: strings.user.login.invalid_credentials,
                },
            };
        }

        await sessionManager.createSession(
            validatedUsername.data,
            SessionType.Client,
        );
    } catch (error) {
        console.error("Error de inicio de sesión:", error);

        if (error instanceof NotFoundError)
            return {
                errors: {
                    general: "Usuario o contraseña incorrectos.",
                },
            };

        return {
            errors: {
                general: strings.user.login.unexpected_error,
            },
        };
    }
    if (pay) redirect("/carrito?pay=true");
    redirect("/");
}
