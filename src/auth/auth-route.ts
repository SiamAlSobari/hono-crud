import { Hono } from "hono";
import { authController } from "./auth-controller";
import { zValidator } from "@hono/zod-validator";
import { authSchema } from "./auth-schema";
import { authMiddleware } from "../../common/middlewares/auth-middleware";
import { roleMiddleware } from "../../common/middlewares/role-middleware";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", authSchema.register),
  (c) => authController.register(c)
);

authRoute.post(
  "/login",
  zValidator("json", authSchema.login),
  (c) => authController.login(c)
);

authRoute.get(
  "/me", 
  authMiddleware,
  (c) => authController.me(c)
);
