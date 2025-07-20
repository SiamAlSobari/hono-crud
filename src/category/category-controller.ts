import { Context } from "hono";
import { createCategoryInput, updateCategoryInput } from "./category-schema";
import { categoryService } from "./category-service";

class CategoryController {
    public async createCategory(c: Context) {
        const input = (await c.req.json()) as createCategoryInput;
        const category = await categoryService.createCategory(input);
        return c.json({
            message: "category created",
            data: category,
        });
    }

    public async getCategories(c: Context) {
        const categories = await categoryService.getCategories();
        return c.json({
            message: "categories",
            data: categories,
        });
    }

    public async updateCategory(c: Context) {
        const input = (await c.req.json()) as updateCategoryInput;
        const category = await categoryService.updateCategory(input, c.req.param("id"));
        return c.json({
            message: "category updated",
            data: category,
        });
    }
}

export const categoryController = new CategoryController();
