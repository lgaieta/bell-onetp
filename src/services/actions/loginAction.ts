"use server";
import { LoginFormState } from "@/components/login/LoginForm";
import strings from "@/lib/strings";
import UserRepository from "@/models/UserRepository";
import MySQLUserRepository from "@/services/MySQLUserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { UserUsernameSchema, UserPasswordSchema } from "@/services/UserSchema";
import { redirect } from "next/navigation";

export async function loginAction(
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

        const passwordValid = passwordEncrypter.compare(
            validatedPassword.data,
            savedUser.password,
        );

        if (!passwordValid) {
            return {
                errors: {
                    password: strings.user.login.invalid_credentials,
                },
            };
        }

        await sessionManager.createSession(
            validatedUsername.data,
            SessionType.Client,
        );
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        return {
            errors: {
                general: strings.user.login.unexpected_error,
            },
        };
    }
    redirect("/");
}
