import { Context } from "hono";
import { loginInput, registerInput } from "./auth-schema";
import { authService } from "./auth-service";
import { setCookie } from "hono/cookie";

const register = async (c: Context) => {
  const input = (await c.req.json()) as registerInput;
  const exist = await authService.existingUser(input.email);
  if (exist) return c.json({ message: "email already exist" }, 400);
  const user = await authService.register(input);
  return c.json({
    message: "register",
    data: user,
  });
};

const login = async (c: Context) => {
  const input = (await c.req.json()) as loginInput;
  const user = await authService.login(input);
  const cookie = await setCookie(c, "token", user.token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 2,
    sameSite: "lax",
    httpOnly: true,
  });

  return c.json({
    message: "login",
    data: user,
  });
};

const me = async (c: Context) => {
  const user = c.get("user");
  return c.json({ message: "me", data: user });
};

export const authController = {
  register,
  login,
  me,
};
