"use server";

import { CreateOrganizationState } from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { CreateOrganizationSchema } from "@/lib/zod-schemas/organization";
import { redirect } from "next/navigation";

export async function createOrganization(state: CreateOrganizationState, formData: FormData) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const validatedFields = CreateOrganizationSchema.safeParse({
            title: formData.get("title"),
            description: formData.get("description"),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        if (!user) return redirect("/login");

        const { error } = await supabase.from("organizations_profiles").insert({
            title: validatedFields.data.title,
            ...(validatedFields.data.description ? { description: validatedFields.data.description } : {}),
        });

        if (error) {
            throw error;
        }

        return {
            success: true,
        };
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }
}
export async function updateOrganization(
    state: CreateOrganizationState,
    formData: FormData
): Promise<{
    generalErrorMessage?: string;
    payload?: FormData;
    success?: boolean;
    errors?: { title?: string[]; description?: string[] };
}> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const validatedFields = CreateOrganizationSchema.safeParse({
            title: formData.get("title"),
            description: formData.get("description"),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        if (!user) return redirect("/login");

        const type = formData.get("type");
        if (type == "edit") {
            const { error } = await supabase
                .from("organizations_profiles")
                .update({
                    title: validatedFields.data.title,
                    ...(validatedFields.data.description ? { description: validatedFields.data.description } : {}),
                })
                .eq("id", parseInt(formData.get("id") as string));

            if (error) {
                throw error;
            }
        } else {
            const { error } = await supabase.from("organizations_profiles").insert({
                title: validatedFields.data.title,
                ...(validatedFields.data.description ? { description: validatedFields.data.description } : {}),
            });

            if (error) {
                throw error;
            }
        }

        return {
            success: true,
        };
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }
}
