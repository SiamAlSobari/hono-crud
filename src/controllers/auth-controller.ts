import { Context } from "hono"
import { registerInput } from "../schema/auth-schema"
import { authService } from "../services/auth-service"



 const register = async (c: Context) => {
    const input = await c.req.json() as registerInput
    const user = await authService.register(input)
    return c.json({
        message: 'register',
        data: user,
    })
}


export const authController ={
    register
}