import { db } from "../../common/utils/database";
import { mediaService } from "../media/media-service";

class PostService {
  public async createPostLongVideo(description: string, media: File, userId: string,baseUrl:string,title: string) {
    const create = await db.post.create({
      data: {
        user_id: userId,
        description: description,
        title: title,
      },
    });

    if (media) {
      await mediaService.createMedia(media, create.id,baseUrl);
    }

    return create;
  }
}

export const postService = new PostService();