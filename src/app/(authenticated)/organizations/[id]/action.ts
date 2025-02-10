"use server";

import { ApplyToEventFormState, CreateEventState, UpdateEventStatusStateState } from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { CreateEventSchema } from "@/lib/zod-schemas/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
            points_for_participation: formData.get("points_for_participation") as string,
            deduction_points_for_absence: formData.get("deduction_points_for_absence") as string,
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

export async function updateEventStatus(
    state: UpdateEventStatusStateState,
    formData: FormData
): Promise<{
    generalErrorMessage?: string;
    payload?: FormData;
    success?: boolean;
    errors?: { status?: string[] };
}> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const validatedFields = z
            .object({
                status: z.enum(["open", "closed", "completed"]),
            })
            .safeParse({
                status: formData.get("status") as string,
            });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                payload: formData,
            };
        }

        if (!user) return redirect("/login");

        const { error } = await supabase
            .from("events")
            .update({
                status: validatedFields.data.status,
            })
            .eq("id", parseInt(formData.get("id") as string));

        if (error) {
            throw error;
        }
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

export async function applyToEvent(state: ApplyToEventFormState, formData: FormData) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return redirect("/login");

        const id = parseInt(formData.get("event_id") as string);

        const { data: user_signup, error: user_signup_error } = await supabase
            .from("event_signups")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

        if (user_signup_error) {
            throw user_signup_error;
        }

        if (user_signup) {
            return {
                success: false,
                generalErrorMessage:
                    user_signup.status == "pending"
                        ? "You have already applied to this event"
                        : user_signup.status == "rejected"
                        ? "Sorry, you haven't been selected this time. Don't feel demotivated, there are plenty of opportunities waiting for you"
                        : "You have already been accepted to this event",
            };
        }

        const { error } = await supabase.from("event_signups").insert({
            user_id: user.id,
            event_id: id,
            status: "pending",
        });

        if (error) {
            throw error;
        }

        revalidatePath("/", "layout");
    } catch (err: any) {
        console.log(err);
        return {
            generalErrorMessage: err.message || "Something went wrong. Please try again.",
        };
    }
}
