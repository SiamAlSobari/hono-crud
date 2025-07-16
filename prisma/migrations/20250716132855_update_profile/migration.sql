-- AlterTable
ALTER TABLE `profile` MODIFY `caption` TEXT NULL,
    MODIFY `avatar_url` VARCHAR(191) NOT NULL DEFAULT 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg';
