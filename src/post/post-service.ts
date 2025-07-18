import { db } from "../../common/utils/database";
import { mediaService } from "../media/media-service";

class PostService {
  public async createPost(caption: string, media: File, userId: string,baseUrl:string) {
    const create = await db.post.create({
      data: {
        user_id: userId,
        caption,
      },
    });

    if (media) {
      await mediaService.createMedia(media, create.id,baseUrl);
    }

    return create;
  }
}

export const postService = new PostService();