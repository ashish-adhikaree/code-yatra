import { z } from "zod";

export const CreateEventSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
    required_volunteers: z.number().int().positive(),
    latitude: z.number(),
    longitude: z.number(),
    radius_in_km: z.number().int().positive(),
    categories: z.array(z.number()).nonempty(),
    start_date: z.string().nonempty(),
    end_date: z.string().nonempty(),
    organization_id: z.number().int().positive(),
    location: z.string().nonempty(),
    status: z.enum(["open", "closed", "completed"]),
});
