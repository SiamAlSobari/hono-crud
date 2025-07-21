import { db } from "../../common/utils/database";
import * as path from "path";
import { mkdirSync, existsSync } from "fs";
import { randomUUID } from "crypto";

// Kelas layanan untuk operasi media
class MediaService {
    // Method async untuk menyimpan array file ke disk & database
    public async createMedia(media: File, postId: string, baseUrl: string, type: string) {
        const uploadDir = "./uploads/posts/";

        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true }); // recursive agar path yang dalam juga dibuat
        }

        const arr = await media.arrayBuffer();

        const buffer = Buffer.from(arr);

        const ext = path.extname(media.name);

        const randomName = randomUUID() + ext;

        const filePath = path.join(uploadDir, randomName);

        await Bun.write(filePath, buffer);

        await db.media.create({
            data: {
                post_id: postId, // Relasi ke post
                media_url: `${baseUrl}/api/uploads/posts/${randomName}`, // URL file untuk diakses frontend
                type: type, // Jenis MIME, seperti 'image/png'
            },
        });

        console.log("File saved to:", filePath);
    }
}

// Export instance tunggal dari MediaService
export const mediaService = new MediaService();
