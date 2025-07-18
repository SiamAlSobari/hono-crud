import { db } from "../../common/utils/database";
import * as path from "path";
import { mkdirSync, existsSync } from "fs";
import { randomUUID } from "crypto";

// Kelas layanan untuk operasi media
class MediaService {
  // Method async untuk menyimpan array file ke disk & database
  public async createMedia(media: File, postId: string, baseUrl: string) {
    // Folder tujuan untuk menyimpan media
    const uploadDir = "./uploads/posts/";

    // Cek apakah folder sudah ada, jika belum maka dibuat
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true }); // recursive agar path yang dalam juga dibuat
    }

      // Ubah isi file menjadi array buffer (biner)
      const arr = await media.arrayBuffer();

      // Ubah array buffer menjadi buffer Node.js (atau Bun)
      const buffer = Buffer.from(arr);

      // Dapatkan ekstensi file (.jpg, .png, dll)
      const ext = path.extname(media.name);

      // Buat nama acak untuk file (menghindari nama bentrok)
      const randomName = randomUUID() + ext;

      // Gabungkan path folder dan nama file
      const filePath = path.join(uploadDir, randomName);

      // Simpan file ke disk secara async menggunakan Bun
      await Bun.write(filePath, buffer);

      // Simpan metadata media ke database
      await db.media.create({
        data: {
          post_id: postId, // Relasi ke post
          media_url: `${baseUrl}/api/uploads/posts/${randomName}`, // URL file untuk diakses frontend
          type: "long", // Jenis MIME, seperti 'image/png'
        },
      });

      // Logging agar tahu file berhasil disimpan (debug)
      console.log("File saved to:", filePath);
  }
}

// Export instance tunggal dari MediaService
export const mediaService = new MediaService();
