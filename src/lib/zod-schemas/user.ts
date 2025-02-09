import { z } from "zod";

export const EditProfileSchema = z.object({
    fullname: z.string().nonempty("Name is required"),
    bio: z.string().optional(),
    latitude:z.number().min(-90,"Try value between -180 to +180").max(90,"Try value between -180 to +180"),
    longitude:z.number().min(-180,"Try value between -180 to +180").max(180,"Try value between -180 to +180"),
    radius_in_km:z.number().min(1,"Try Higher Number than 1"),
});
