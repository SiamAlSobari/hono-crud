import { Context } from "hono"
import { postService } from "./post-service"

const createPost = async (c: Context) => {
    const { caption } = await c.req.json()
    const file = await c.req.parseBody()
    const media = Array.isArray(file["media"]) ? file["media"] as File[] : [file["media"] as File]
    const post = await postService.createPost(caption, media)
    
}


export const postController = {}