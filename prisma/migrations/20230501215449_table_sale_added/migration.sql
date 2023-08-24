-- CreateTable
CREATE TABLE `sale` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `costo_total` DOUBLE NOT NULL,
    `sale_date` DATETIME(3) NOT NULL,
    `clientID` VARCHAR(191) NOT NULL,
    `orgID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
