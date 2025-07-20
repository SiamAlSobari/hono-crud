import { Hono } from "hono";
import { authRoute } from "./auth/auth-route";
import { Exception } from "../common/utils/exception";
import { postRoute } from "./post/post-route";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { categoryRoute } from "./category/category-route";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.use(
  "*",
  cors({
    origin: (origin) => origin ?? "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use("/uploads/*", serveStatic({ root: "../" }));

// error handler
app.onError((err, c) => {
  if (err instanceof Exception) {
    return c.json(
      { success: false, message: err.message },
      { status: err.status as 400 } // status-nya harus termasuk dalam ContentfulStatusCode
    );
  }

  return c.json({ success: false, message: err.message }, { status: 500 });
});

app.route("/auth", authRoute);
app.route("/post", postRoute);
app.route("category", categoryRoute);

export default app;
