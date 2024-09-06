"use server";
import { RegisterFormState } from "@/components/register/RegisterForm";
import AlreadyExistsError from "@/lib/AlreadyExistsError";
import strings from "@/lib/strings";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import {
    UserUsernameSchema,
    UserPasswordSchema,
} from "@/services/schemas/UserSchema";
import { zodErrorToFieldErrors } from "@/services/schemas/zodErrorToFieldErrors";
import SessionManager from "@/services/SessionManager";
import { SessionType } from "@/services/SessionPayload";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function registerUserAction(
    _: RegisterFormState,
    formData: FormData,
) {
    try {
        const data = Object.fromEntries(formData);

        const validatedUsername = UserUsernameSchema.parse(data.username);
        const validatedPassword = UserPasswordSchema.parse(data.password);

        const encryptedPassword = await PasswordEncrypter.encrypt(
            validatedPassword,
        );

        const userRepository = new MySQLUserRepository();

        await userRepository.create(validatedUsername, encryptedPassword);

        await SessionManager.createSession(
            validatedUsername,
            SessionType.Client,
        );
    } catch (e) {
        console.error(e);
        if (e instanceof ZodError)
            return {
                errors: zodErrorToFieldErrors(e),
            };

        if (e instanceof AlreadyExistsError) {
            return {
                errors: {
                    general: strings.user.register.already_exists,
                },
            };
        }

        return {
            errors: {
                general: "Ocurrió un error al intentar crear la cuenta",
            },
        };
    }

    redirect("/");
}
