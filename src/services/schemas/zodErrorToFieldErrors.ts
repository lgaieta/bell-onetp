import { ZodError } from "zod";

export function zodErrorToFieldErrors(error: ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {};

    error.errors.forEach((err) => {
        if (err.path.length > 0) {
            const fieldName = err.path[0];
            fieldErrors[fieldName] = err.message;
        }
    });

    return fieldErrors;
}
