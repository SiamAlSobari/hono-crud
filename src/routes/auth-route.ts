import { Hono } from "hono";
import { authController } from "../controllers/auth-controller";
import { zValidator } from "@hono/zod-validator";
import { authSchema } from "../schema/auth-schema";
import { authMiddleware } from "../../common/middlewares/auth-middleware";

export const authRoute = new Hono()

authRoute.post('/register',zValidator('json',authSchema.register),authMiddleware,authController.register)