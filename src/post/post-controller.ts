import { Context } from "hono";
import { postService } from "./post-service";
import { Exception } from "../../common/utils/exception";

class PostController {
  public async createPost(c: Context) {
    const reqUrl = new URL(c.req.url);
    const baseUrl = `${reqUrl.protocol}//${reqUrl.host}`;
    const userId = c.get("user").id;

    const formData = await c.req.formData();
    const caption = formData.get("caption")?.toString();
    const media = formData.get("media") as File

    if (!caption?.trim() && media) {
      throw new Exception("caption or media is required", 400);
    }

    const post = await postService.createPost(
      caption || "",
      media,
      userId,
      baseUrl
    );

    return c.json({
      message: "post berhasil dibuat",
    });
  }
}

export const postController = new PostController();