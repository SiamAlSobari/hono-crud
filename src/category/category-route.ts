import { Hono } from "hono";
import { authMiddleware } from "../../common/middlewares/auth-middleware";
import { categoryController } from "./category-controller";

export const categoryRoute = new Hono();

categoryRoute.post("/create", authMiddleware, (c) => categoryController.createCategory(c));
categoryRoute.get("/list", authMiddleware, (c) => categoryController.getCategories(c));

