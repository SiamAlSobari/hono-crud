/*
  Warnings:

  - You are about to drop the column `caption` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `caption`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `title` TEXT NULL;
