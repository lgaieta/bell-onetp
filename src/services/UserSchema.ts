import { z } from "zod";

export const UserUsernameSchema = z
    .string()
    .min(1, { message: "Username cannot be empty" })
    .max(16, { message: "Username cannot exceed 16 characters" });

export const UserSchema = z.object({
    username: UserUsernameSchema,
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email cannot exceed 255 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(65, { message: "Password cannot exceed 65 characters" }),
    create_time: z.date({
        required_error: "Create time is required",
        invalid_type_error: "Invalid date format",
    }),
    CP: z.string().max(45, { message: "CP cannot exceed 45 characters" }),
});

export default UserSchema;
