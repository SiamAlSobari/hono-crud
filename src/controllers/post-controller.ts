import { Context } from "hono"

const createPost = async (c: Context) => {
    const { content } = await c.req.json()
    
}


export const postController = {}