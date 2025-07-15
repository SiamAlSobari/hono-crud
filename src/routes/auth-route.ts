import { Hono } from "hono";

export const authRoute = new Hono()

authRoute.get("/", (c) => {
    return c.text("Hello auth!");
});