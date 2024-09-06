import { z } from "zod";

export const UserUsernameSchema = z
    .string()
    .trim()
    .min(1, { message: "El nombre de usuario no puede estar vacío" })
    .max(16, {
        message: "El nombre de usuario no debe exceder los 16 caracteres",
    });

export const UserEmailSchema = z
    .string()
    .trim()
    .email({ message: "Dirección de correo electrónico no válida" })
    .max(255, {
        message: "El correo electrónico no debe exceder los 255 caracteres",
    });

export const UserPasswordSchema = z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(65, { message: "La contraseña no debe exceder los 65 caracteres" });

export const UserZipCodeSchema = z
    .string()
    .trim()
    .max(45, { message: "El código postal no debe exceder los 45 caracteres" });

export const UserSchema = z.object({
    username: UserUsernameSchema,
    email: UserEmailSchema,
    password: UserPasswordSchema,
    zipCode: UserZipCodeSchema,
});

export default UserSchema;
