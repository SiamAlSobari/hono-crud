import { Context } from "hono";
import { loginInput, registerInput } from "./auth-schema";
import { setCookie } from "hono/cookie";
import { authService } from "./auth-service";

class AuthController {
  public async register(c: Context) {
    const input = (await c.req.json()) as registerInput;
    const exist = await authService.existingUser(input.email);
    if (exist) return c.json({ message: "email already exist" }, 400);
    const user = await authService.register(input);
    return c.json({
      message: "register",
      data: user,
    });
  }

  public async login(c: Context) {
    const input = (await c.req.json()) as loginInput;
    const user = await authService.login(input);
    await setCookie(c, "token", user.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 2,
      sameSite: "lax",
      httpOnly: true,
    });

    return c.json({
      message: "login",
      data: user,
    });
  }

  public async session(c: Context) {
    const user = c.get("user");
    return c.json(user)
  }
}

export const authController = new AuthController();
