import { db } from "../../common/utils/database";
import * as path from "path";
import { mkdirSync, existsSync } from "fs";
import { randomUUID } from "crypto";

class MediaService {
  public async createMedia(media: File[], postId: string, baseUrl: string) {
    const uploadDir = "./uploads/posts/";

    // Buat folder kalau belum ada
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of media) {
      const arr = await file.arrayBuffer();
      const buffer = Buffer.from(arr);

      const ext = path.extname(file.name);
      const randomName = randomUUID() + ext;

      const filePath = path.join(uploadDir, randomName);

      // Simpan file ke disk
      await Bun.write(filePath, buffer);

      // Simpan ke DB
      await db.media.create({
        data: {
          post_id: postId,
          media_url: `${baseUrl}/uploads/posts/${randomName}`,
          type: file.type,
        },
      });

      // Debug log
      console.log("File saved to:", filePath);
    }
  }
}

export const mediaService = new MediaService();
