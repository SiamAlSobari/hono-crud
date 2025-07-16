import { sign } from "hono/jwt";
import { db } from "../../common/utils/database";
import { Exception } from "../../common/utils/exception";
import { comparePassword, hashPassword } from "../../common/utils/hash";
import { loginInput, registerInput } from "../schema/auth-schema";
import { jwtSecret } from "../../common/jwt/jwt-secret";
import { generateToken } from "../../common/jwt/geterate-token";

const register = async (input: registerInput) => {
  const hasPassword = await hashPassword(input.password);
  const createUser = await db.user.create({
    data: {
      email: input.email,
      password: hasPassword,
      profile: {
        create: {
          name: input.name,
        },
      },
    },
  });
  return createUser;
};

export const login = async (input: loginInput) => {
  const user = await existingUser(input.email);
  if (!user) throw new Exception("user not found", 404);

  const compare = await comparePassword(input.password, user.password);
  if (!compare) throw new Exception("wrong password", 400);

  const payload = { id: user.id, email: user.email };
  const token = await generateToken(payload, jwtSecret!);
  return { token };
};

export const existingUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const authService = {
  register,
  existingUser,
  login,
};
