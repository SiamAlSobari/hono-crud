import { Context, MiddlewareHandler } from 'hono'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { jwtSecret } from '../jwt/jwt-secret'


export const authMiddleware : MiddlewareHandler = async (c:Context, next) => {
    const token = await getCookie(c, 'token')
    // cek token
    if (!token) return c.json({message: 'unauthenticated'}, 401)
    
    try {
        // decode token
        const payload = await verify(token, jwtSecret!)
        //set user to context
        c.set('user', payload)
        await next()
    } catch (error) {
        return c.json({message: 'unauthenticated'}, 401)
    }
}