/*
  Warnings:

  - You are about to drop the `_producttosale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_producttosale` DROP FOREIGN KEY `_productTosale_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttosale` DROP FOREIGN KEY `_productTosale_B_fkey`;

-- DropTable
DROP TABLE `_producttosale`;

-- CreateTable
CREATE TABLE `producttosale` (
    `id` VARCHAR(191) NOT NULL,
    `productID` VARCHAR(191) NOT NULL,
    `saleID` VARCHAR(191) NOT NULL,
    `cuantity` INTEGER NOT NULL,
    `cost` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `producttosale` ADD CONSTRAINT `producttosale_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producttosale` ADD CONSTRAINT `producttosale_saleID_fkey` FOREIGN KEY (`saleID`) REFERENCES `sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
