/*
  Warnings:

  - You are about to drop the column `clientID` on the `profile_image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `profile_image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `profile_image` DROP FOREIGN KEY `profile_image_clientID_fkey`;

-- AlterTable
ALTER TABLE `profile_image` DROP COLUMN `clientID`,
    ADD COLUMN `userID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `profile_image_userID_key` ON `profile_image`(`userID`);

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
