import { Hono } from "hono";
import { postController } from "./post-controller";
import { authMiddleware } from "../../common/middlewares/auth-middleware";

export const postRoute = new Hono();

postRoute.post("/create",authMiddleware, postController.createPost);