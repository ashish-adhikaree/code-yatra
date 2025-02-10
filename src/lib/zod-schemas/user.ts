import { z } from "zod";

export const EditProfileSchema = z.object({
    fullname: z.string().nonempty("Name is required"),
    bio: z.string().optional(),
    latitude: z.string().transform((val, ctx) => {
        if (!val) return val;
        const parsedValue = parseFloat(val);
        if (isNaN(parsedValue))
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Latitude should be a number",
            });
        if (parsedValue < -90 || parsedValue > 90) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Latitude should be between -90 to +90",
            });
        }
        return parsedValue;
    }),
    longitude: z.string().transform((val, ctx) => {
        if (!val) return val;
        const parsedValue = parseFloat(val);
        if (isNaN(parsedValue))
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Longitude should be a number",
            });
        if (parsedValue < -180 || parsedValue > 180) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Longitude should be between -180 to +180",
            });
        }
        return parsedValue;
    }),
    radius_in_km: z.string().transform((val, ctx) => {
        if (!val) return val;
        const parsedValue = parseFloat(val);
        if (isNaN(parsedValue))
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Radius should be a number",
            });
        if (parsedValue < 0) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Radius should be a positive number",
            });
        }
        return parsedValue;
    }),
    categories: z.array(z.number()).nonempty(),
    current_categories: z.array(z.number()),
});
