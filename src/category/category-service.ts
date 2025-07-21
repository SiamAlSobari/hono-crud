import { db } from "../../common/utils/database";
import { Exception } from "../../common/utils/exception";
import { createCategoryInput } from "./category-schema";

class CategoryService {
    public async createCategory(input: createCategoryInput) {
        const exist = await this.existingCategory(input.name);
        if (exist) throw new Exception("category already exist", 400);
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

    public async existingCategory(name: string) {
        const category = await db.category.findFirst({
            where: {
                name,
            },
        });
        return category;
    }
}

export const categoryService = new CategoryService();
