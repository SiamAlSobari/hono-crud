import { MiddlewareHandler } from "hono";
import { Context } from "hono/jsx";
import { Exception } from "../utils/exception";

export const roleMiddleware =(role:string[]) :MiddlewareHandler => {
    return async (c, next) => {
        const user = c.get("user");
        if (!user){
            throw new Exception("unauthenticated", 401);
        }
        if (!role.includes(user.role)){
            throw new Exception("role not allowed", 403);
        }
        return next();
    }

}