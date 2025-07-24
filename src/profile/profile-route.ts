import { Hono } from "hono";
import { authMiddleware } from "../../common/middlewares/auth-middleware";
import { profileController } from "./profile-controller";

export const profileRoute = new Hono();

profileRoute.get("/", authMiddleware, (c) => profileController.getProfile(c));
profileRoute.patch("/", authMiddleware, (c) => profileController.updateProfile(c));
