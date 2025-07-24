import { existsSync, mkdirSync } from "fs";
import { db } from "../../common/utils/database";
import { mediaService } from "../media/media-service";
import path = require("path");
import { randomUUID } from "crypto";

class PostService {
    public async createPostLongVideo(
        description: string,
        media: File,
        userId: string,
        baseUrl: string,
        title: string,
        tumbnail: File,
        category: string[]
    ) {
        const uploadDir = "./uploads/thumbnail/";

        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        const img = await tumbnail.arrayBuffer();
        const buffer = Buffer.from(img);
        const ext = path.extname(tumbnail.name);
        const randomName = randomUUID() + ext;
        const filePath = path.join(uploadDir, randomName);
        await Bun.write(filePath, buffer);
        const typeMedia = "video";

        const create = await db.post.create({
            data: {
                user_id: userId,
                description: description,
                title: title,
                tumbnail_image: `${baseUrl}/api/uploads/thumbnail/${randomName}`,
                postCategory: {
                    create: category.map((category) => ({
                        category: {
                            connect: {
                                id: category,
                            },
                        },
                    })),
                },
            },
        });
        await mediaService.createMedia(media, create.id, baseUrl, typeMedia);
        return create;
    }

    public async getPosts() {
        const posts = await db.post.findMany({
            include: {
                user: true,
                postCategory: {
                    include: {
                        category: true,
                    },
                },
                medias: true,
            },
        });
        return posts;
    }
}

export const postService = new PostService();
