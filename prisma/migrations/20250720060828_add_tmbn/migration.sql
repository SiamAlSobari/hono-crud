/*
  Warnings:

  - Added the required column `tumbnail_image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `tumbnail_image` VARCHAR(191) NOT NULL;
