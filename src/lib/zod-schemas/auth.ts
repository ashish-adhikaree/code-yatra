import { z } from "zod";

export const SignupFormSchema = z
    .object({
        email: z.string().email({ message: "Invalid email." }).trim(),
        password: z
            .string()
            .min(8, { message: "Must be at least 8 characters long" })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Must contain at least one special character.",
            })
            .trim(),
        confirm_password: z.string().trim(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match.",
        path: ["confirm_password"],
    });

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email." }).trim(),
    password: z.string().trim(),
});