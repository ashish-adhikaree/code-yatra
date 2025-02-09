import { z } from "zod";

export const PaginationParamsSchema = z.object({
    page: z
        .string()
        .optional()
        .transform((value) => {
            if (!value) return 0;
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) return 0;
            return parsed - 1;
        }),
    size: z
        .string()
        .optional()
        .transform((value) => {
            if (!value) return 10;
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) return 10;
            return parsed;
        }),
});

export const getParsedPaginationParams = ({ page, size }: { page?: string; size?: string }) => {
    return PaginationParamsSchema.safeParse({ page, size }).data;
};
