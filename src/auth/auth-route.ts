import { Hono } from "hono";
import { authController } from "./auth-controller";
import { zValidator } from "@hono/zod-validator";
import { authSchema } from "./auth-schema";
import { authMiddleware } from "../../common/middlewares/auth-middleware";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", authSchema.register),
  authController.register
);
authRoute.post(
  "/login",
  zValidator("json", authSchema.login),
  authController.login
);
authRoute.get("/me", authMiddleware, authController.me);
