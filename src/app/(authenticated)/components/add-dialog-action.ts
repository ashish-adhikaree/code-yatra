"use server";

import { AddFullNameDialogState } from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addFullName(state: AddFullNameDialogState, formData: FormData) {
    try {
        const validatedFields = z
            .object({
                fullname: z.string().nonempty("Full name is required"),
            })
            .safeParse({
                fullname: formData.get("fullname"),
            });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        const supabase = await createClient();
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (!user || userError) {
            throw new Error("User not found");
        }

        const { error } = await supabase
            .from("user_profiles")
            .update({
                fullname: validatedFields.data.fullname,
            })
            .eq("auth_user_id", user.id);

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
}
