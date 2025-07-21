import { existsSync, mkdirSync } from "fs";
import { db } from "../../common/utils/database";
import { mediaService } from "../media/media-service";
import path = require("path");
import { randomUUID } from "crypto";

class PostService {
  public async createPostLongVideo(description: string, media: File, userId: string,baseUrl:string,title: string, tumbnail: File, ) {
    const uploadDir = "./uploads/thumbnail/";
    const dummyCategory : string[] = []

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const arr = await tumbnail.arrayBuffer()
    const buffer = Buffer.from(arr)
    const ext = path.extname(tumbnail.name)
    const randomName = randomUUID() + ext
    const filePath = path.join(uploadDir, randomName)
    await Bun.write(filePath, buffer)

    const create = await db.post.create({
      data: {
        user_id: userId,
        description: description,
        title: title,
        tumbnail_image: `${baseUrl}/uploads/thumbnail/${randomName}`,
        postCategory: {
          create: dummyCategory.map((category) => ({
            category: {
              connect: {
                id: category,
              },
            },
          }))
        }
      },
    });

    if (media) {
      await mediaService.createMedia(media, create.id,baseUrl);
    }

    return create;
  }
}

export const postService = new PostService();