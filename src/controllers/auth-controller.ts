import { Context } from "hono"
import { registerInput } from "../schema/auth-schema"



 const register = async (c: Context) => {
    const input = await c.req.json() as registerInput
    return c.json({
        message: 'register',
        data: input,
    })
}


export const authController ={
    register
}