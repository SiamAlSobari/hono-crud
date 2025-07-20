import z from "zod";

const createCategorySchema = z.object({
    name: z.string({ error: "Name wajib diisi" }).min(3, "Name minimal 3 karakter").max(100),
});

const updateCategorySchema = z.object({
    name: z.string({ error: "Name wajib diisi" }).min(3, "Name minimal 3 karakter").max(100),
});

export const categorySchema = {
    createCategorySchema,
    updateCategorySchema,
};

export type createCategoryInput = z.infer<typeof createCategorySchema>;
export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
