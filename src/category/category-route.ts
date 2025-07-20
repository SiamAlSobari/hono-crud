import { Hono } from "hono";

export const categoryRoute = new Hono();

categoryRoute.get("/", (c) => {
    return c.text("Hello Category!");
});