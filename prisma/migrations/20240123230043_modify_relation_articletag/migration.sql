/*
  Warnings:

  - You are about to drop the `_articletotag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_articletotag` DROP FOREIGN KEY `_ArticleToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_articletotag` DROP FOREIGN KEY `_ArticleToTag_B_fkey`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `tagId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_articletotag`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
