import { db } from "../../common/utils/database";
import { mediaService } from "../media/media-service";

const createPost = async (caption: string, media: File[], userId: string,baseUrl:string) => {
  const create = await db.post.create({
    data: {
      user_id: userId,
      caption,
    },
  });

  if (media && media.length > 0) {
    await mediaService.createMedia(media, create.id,baseUrl);
  }

  return create;
};

export const postService = {
  createPost,
};
