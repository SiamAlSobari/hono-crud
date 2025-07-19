import { db } from "../../common/utils/database";
import { Exception } from "../../common/utils/exception";
import { comparePassword, hashPassword } from "../../common/utils/hash";
import { loginInput, registerInput } from "./auth-schema";
import { jwtSecret } from "../../common/jwt/jwt-secret";
import { generateToken } from "../../common/jwt/geterate-token";

class AuthService {
  public async register(input: registerInput) {
    const roleCount = await this.roleCount();
    const userRole = roleCount >= 3 ? "user" : "admin";
    const hasPassword = await hashPassword(input.password);
    const createUser = await db.user.create({
      data: {
        email: input.email,
        password: hasPassword,
        role: userRole,
        profile: {
          create: {
            name: input.name,
          },
        },
      },
    });
    return createUser;
  }

  public async login(input: loginInput) {
    // cek user
    const user = await this.existingUser(input.email);
    if (!user) throw new Exception("user not found", 404);

    // compare password
    const compare = await comparePassword(input.password, user.password);
    if (!compare) throw new Exception("wrong password", 400);

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await generateToken(payload, jwtSecret!);
    return { token };
  }

  public async existingUser(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async roleCount() {
    return await db.user.count({
      where: {
        role: "admin",
      },
    });
  }
}

export const authService = new AuthService();
