-- CreateTable
CREATE TABLE `generalclient` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `idNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `generalclient_id_key`(`id`),
    UNIQUE INDEX `generalclient_idNumber_key`(`idNumber`),
    UNIQUE INDEX `generalclient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `idNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `client_id_key`(`id`),
    UNIQUE INDEX `client_idNumber_key`(`idNumber`),
    UNIQUE INDEX `client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `status_id_key`(`id`),
    UNIQUE INDEX `status_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_clientTostatus` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_clientTostatus_AB_unique`(`A`, `B`),
    INDEX `_clientTostatus_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_clientTostatus` ADD CONSTRAINT `_clientTostatus_A_fkey` FOREIGN KEY (`A`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_clientTostatus` ADD CONSTRAINT `_clientTostatus_B_fkey` FOREIGN KEY (`B`) REFERENCES `status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
