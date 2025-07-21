import { Hono } from "hono";

export const profileRoute = new Hono();

profileRoute.get("/", (c) => {
    return c.text("Hello Hono!");
});