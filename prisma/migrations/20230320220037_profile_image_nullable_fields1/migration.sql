-- DropForeignKey
ALTER TABLE `profile_image` DROP FOREIGN KEY `profile_image_clientID_fkey`;

-- DropForeignKey
ALTER TABLE `profile_image` DROP FOREIGN KEY `profile_image_orgID_fkey`;

-- AlterTable
ALTER TABLE `profile_image` MODIFY `orgID` VARCHAR(191) NULL,
    MODIFY `clientID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
