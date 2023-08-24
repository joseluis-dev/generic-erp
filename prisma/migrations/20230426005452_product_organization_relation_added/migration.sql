/*
  Warnings:

  - Added the required column `orgID` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profile_image` DROP FOREIGN KEY `profile_image_orgID_fkey`;

-- DropForeignKey
ALTER TABLE `profile_image` DROP FOREIGN KEY `profile_image_userID_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `orgID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
