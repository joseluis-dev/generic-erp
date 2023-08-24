/*
  Warnings:

  - You are about to drop the `_clienttostatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `statusID` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_clienttostatus` DROP FOREIGN KEY `_clientTostatus_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttostatus` DROP FOREIGN KEY `_clientTostatus_B_fkey`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `statusID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_clienttostatus`;

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `statusID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_clientToproduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_clientToproduct_AB_unique`(`A`, `B`),
    INDEX `_clientToproduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_statusID_fkey` FOREIGN KEY (`statusID`) REFERENCES `status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_statusID_fkey` FOREIGN KEY (`statusID`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_clientToproduct` ADD CONSTRAINT `_clientToproduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_clientToproduct` ADD CONSTRAINT `_clientToproduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
