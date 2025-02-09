"use server";

import { CreateEventState } from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { CreateEventSchema } from "@/lib/zod-schemas/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(state: CreateEventState, formData: FormData) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const validatedFields = CreateEventSchema.safeParse({
            title: formData.get("title"),
            description: formData.get("description"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
            categories: formData.getAll("categories[]").map((val) => parseInt(val as string)),
            required_volunteers: parseInt(formData.get("required_volunteers") as string),
            latitude: parseFloat(formData.get("latitude") as string),
            longitude: parseFloat(formData.get("longitude") as string),
            radius_in_km: parseFloat(formData.get("radius_in_km") as string),
            organization_id: parseInt(formData.get("organization_id") as string),
            location: formData.get("location"),
            status: formData.get("status"),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        if (!user) return redirect("/login");

        const { data: event, error } = await supabase
            .from("events")
            .insert({
                title: validatedFields.data.title,
                description: validatedFields.data.description,
                start_date: validatedFields.data.start_date,
                end_date: validatedFields.data.end_date,
                required_volunteers: validatedFields.data.required_volunteers,
                latitude: validatedFields.data.latitude,
                longitude: validatedFields.data.longitude,
                radius_in_km: validatedFields.data.radius_in_km,
                organization_id: validatedFields.data.organization_id,
                location: validatedFields.data.location,
                status: validatedFields.data.status,
            })
            .select()
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!event) {
            throw "Event not created";
        }

        const { error: categoriesError } = await supabase.from("events_categories").insert(
            validatedFields.data.categories.map((category_id) => {
                return {
                    event_id: event.id,
                    category_id,
                };
            })
        );

        if (categoriesError) {
            await supabase.from("events").delete().eq("id", event.id);
            throw "Categories not added";
        }

        return {
            success: true,
            eventId: event.id,
        };
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
            payload: formData,
        };
    }
}

export async function deleteEvent(id: number) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.from("events").delete().eq("id", id);
        if (error) {
            throw error;
        }
        revalidatePath("/", "layout");
        redirect("/organizations");
    } catch (err) {
        console.log(err);
    }
}
