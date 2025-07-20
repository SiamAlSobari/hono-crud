import { db } from "../../common/utils/database";
import { createCategoryInput } from "./category-schema";

class CategoryService {
    public async createCategory(input: createCategoryInput) {
        const category = await db.category.create({
            data: {
                name: input.name,
            },
        });
        return category;
    }

    public async getCategories() {
        const category = await db.category.findMany();
        return category;
    }

    public async updateCategory(input: createCategoryInput, paramId: string) {
        const category = await db.category.update({
            where: {
                id: paramId,
            },
            data: {
                name: input.name,
            },
        });
        return category;
    }
}

export const categoryService = new CategoryService();
