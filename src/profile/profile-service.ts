import path = require("path");
import { db } from "../../common/utils/database";
import { existsSync, mkdirSync } from "fs";
import { randomUUID } from "crypto";

class ProfileService {
    public async getProfile(userId: string) {
        const profile = await db.profile.findUnique({ where: { user_id: userId } });
        return profile;
    }

    public async updateProfile(image:File, userId: string, baseUrl: string) {
        const uploadDir = "./uploads/profile/";
        if(!existsSync(uploadDir)){
            mkdirSync(uploadDir, { recursive: true });
        }
        const img = await image.arrayBuffer()
        const buffer = Buffer.from(img)
        const ext = path.extname(image.name)
        const randomName = randomUUID() + ext
        const filePath = path.join(uploadDir,randomName)
        await Bun.write(filePath,buffer)

        return await db.profile.update({
            where: { user_id: userId },
            data: {
                avatar_url: `${baseUrl}/api/uploads/profile/${randomName}`,
            }
        })

    }
}

export const profileService = new ProfileService();
