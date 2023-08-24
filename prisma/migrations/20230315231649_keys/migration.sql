-- CreateTable
CREATE TABLE `keys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `creation_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `keys_id_key`(`id`),
    UNIQUE INDEX `keys_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
