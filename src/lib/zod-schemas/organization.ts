import { z } from "zod";

export const CreateOrganizationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
});
