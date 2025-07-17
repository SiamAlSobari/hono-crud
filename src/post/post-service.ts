import { db } from "../../common/utils/database"

const createPost = async (caption: string, media: File[]) => {
    const create = await db.
}


export const postService = {
    createPost
}