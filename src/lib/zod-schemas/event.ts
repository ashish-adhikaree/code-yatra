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
    points_for_participation: z.string().transform((val, ctx) => {
        const parsedValue = parseInt(val);
        if (isNaN(parsedValue)) return 0;
        if (parsedValue < 0 && parsedValue > 100) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Participation points should be between 0 and 100",
            });
        }
        return parsedValue;
    }),
    deduction_points_for_absence: z.string().transform((val, ctx) => {
        const parsedValue = parseInt(val);
        if (isNaN(parsedValue)) return 0;
        if (parsedValue < 0 && parsedValue > 100) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Deduction points for absence should be between 0 and 100",
            });
        }
        return parsedValue;
    }),
});
