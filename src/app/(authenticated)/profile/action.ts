"use server";

import { EditProfileState } from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { EditProfileSchema } from "@/lib/zod-schemas/user";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function updateUser(
    state: EditProfileState,
    formData: FormData
): Promise<{
    generalErrorMessage?: string;
    payload?: FormData;
    success?: boolean;
    errors?: Record<string, string[]>;
}> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const validatedFields = EditProfileSchema.safeParse({
            fullname: formData.get("fullname"),
            bio: formData.get("bio"),
            latitude: formData.get("latitude"),
            longitude: formData.get("longitude"),
            radius_in_km: formData.get("radius_in_km"),
            categories: formData.getAll("categories[]").map((val) => parseInt(val as string)),
            current_categories: formData.getAll("current_categories[]").map((val) => parseInt(val as string)),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        if (!user) return redirect("/login");

        const { error } = await supabase
            .from("user_profiles")
            .update({
                fullname: validatedFields.data.fullname,
                longitude: validatedFields.data.longitude as number,
                latitude: validatedFields.data.latitude as number,
                radius_in_km: validatedFields.data.radius_in_km as number,
                bio: validatedFields.data.bio,
            })
            .eq("id", parseInt(formData.get("id") as string));

        if (error) {
            throw error;
        }

        const deletedCategories = validatedFields.data.current_categories.filter(
            (val) => !validatedFields.data.categories.includes(val)
        );

        const newlyAddedCategories = validatedFields.data.categories.filter((val) =>
            !validatedFields.data.current_categories.includes(val)
        );

        if (deletedCategories.length > 0) {
            await supabase
                .from("users_categories")
                .delete()
                .eq("user_id", user.id)
                .in("category_id", deletedCategories);
        }

        if (newlyAddedCategories.length > 0) {
            const { error: categoriesError } = await supabase.from("users_categories").insert(
                newlyAddedCategories.map((category_id) => {
                    return {
                        user_id: user.id,
                        category_id,
                    };
                })
            );

            if (categoriesError) {
                console.log(categoriesError);
                return {
                    generalErrorMessage: "Categories can't be updated",
                    payload: formData,
                };
            }
        }

        revalidatePath("/", "layout");

        return {
            success: true,
            payload: formData,
        };
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }
}
