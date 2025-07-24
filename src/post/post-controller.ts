import { Context } from "hono";
import { postService } from "./post-service";
import { Exception } from "../../common/utils/exception";

class PostController {
    public async createPostLongVideo(c: Context) {
        const reqUrl = new URL(c.req.url);
        const baseUrl = `${reqUrl.protocol}//${reqUrl.host}`;
        const userId = c.get("user").id;

        const formData = await c.req.formData();
        const description = formData.get("description")?.toString();
        const title = formData.get("title")?.toString();
        const media = formData.get("media") as File;
        const tumbnail = formData.get("tumbnail") as File;
        const category = formData.getAll("category") as string[];

        if (!description?.trim() && !media) {
            throw new Exception("caption or media is required", 400);
        }

        if (!tumbnail) {
            throw new Exception("tumbnail is required", 400);
        }

        if (!category) {
            throw new Exception("Category", 400);
        }

        const post = await postService.createPostLongVideo(
            description || "",
            media,
            userId,
            baseUrl,
            title || "",
            tumbnail || "",
            category
        );

        return c.json({
            message: "post berhasil dibuat",
        });
    }

    public async getPosts(c: Context) {
        const posts = await postService.getPosts();
        return c.json({
            message: "Posts berhasil diambil.",
            data: posts,
        });
    }

    public async getPost(c: Context) {
        const userId = c.get("user").id;
        const post = await postService.getPost(userId);
        return c.json({
            message: "Posts berhasil diambil.",
            data: post,
        });
    }
}

export const postController = new PostController();
