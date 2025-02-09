"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import { LoginFormSchema, SignupFormSchema } from "@/lib/zod-schemas/auth";
import { AuthFormState } from "@/lib/interface";

export async function signup(state: AuthFormState, formData: FormData) {
    try {
        const validatedFields = SignupFormSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
            confirm_password: formData.get("confirm_password"),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }
        const supabase = await createClient();
        const { error } = await supabase.auth.signUp(validatedFields.data);
        if (error !== null) {
            throw new Error(error.message);
        }
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }

    revalidatePath("/", "layout");
    redirect("/signup?screen=confirm-email");
}

export async function login(state: AuthFormState, formData: FormData) {
    try {
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithPassword(validatedFields.data);
        if (error !== null) {
            throw new Error(error.message);
        }
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }
    revalidatePath("/", "layout");
    redirect("/");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
}
