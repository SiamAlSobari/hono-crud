-- CreateIndex
CREATE INDEX `Profile_user_id_idx` ON `Profile`(`user_id`);

-- RenameIndex
ALTER TABLE `media` RENAME INDEX `Media_post_id_fkey` TO `Media_post_id_idx`;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `Post_user_id_fkey` TO `Post_user_id_idx`;
