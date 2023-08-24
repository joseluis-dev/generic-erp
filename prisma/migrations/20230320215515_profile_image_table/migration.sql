-- AlterTable
ALTER TABLE `client` ADD COLUMN `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_by` VARCHAR(191) NULL,
    ADD COLUMN `update_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `organization` ADD COLUMN `update_by` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `profile_image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,
    `update_by` VARCHAR(191) NULL,
    `orgID` VARCHAR(191) NOT NULL,
    `clientID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `profile_image_public_id_key`(`public_id`),
    UNIQUE INDEX `profile_image_orgID_key`(`orgID`),
    UNIQUE INDEX `profile_image_clientID_key`(`clientID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_image` ADD CONSTRAINT `profile_image_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
