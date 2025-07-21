import { Context } from "hono";
import { profileService } from "./profile-service";

class ProfileController {
    public async getProfile(c: Context) {
        const userId = c.get("user").id;
        const profile = await profileService.getProfile(userId);
        return c.json({
            message: "profile",
            data: profile,
        });
    }

    public async updateProfile(c: Context) {
        const formData = await c.req.formData();
        const reqUrl = new URL(c.req.url);
        const baseUrl = `${reqUrl.protocol}//${reqUrl.host}`;
        const image = formData.get("image") as File;
        const userId = c.get("user").id;
        const profile = await profileService.updateProfile(image, userId, baseUrl);
        return c.json({
            message: "profile updated",
            data: profile,
        });
    }
}

export const profileController = new ProfileController();
