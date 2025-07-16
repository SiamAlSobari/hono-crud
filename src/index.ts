import { Hono } from "hono";
import { authRoute } from "./routes/auth-route";
import { Exception } from "../common/utils/exception";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// error handler
app.onError((err, c) => {
  if (err instanceof Exception) {
    return c.json(
      { success: false, message: err.message },
      { status: err.status as 400 } // status-nya harus termasuk dalam ContentfulStatusCode
    );
  }

  return c.json({ success: false, message: "Internal Error" }, { status: 500 });
});

app.route("/auth", authRoute);

export default app;
