-- CreateTable
CREATE TABLE `_productTosale` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_productTosale_AB_unique`(`A`, `B`),
    INDEX `_productTosale_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_productTosale` ADD CONSTRAINT `_productTosale_A_fkey` FOREIGN KEY (`A`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productTosale` ADD CONSTRAINT `_productTosale_B_fkey` FOREIGN KEY (`B`) REFERENCES `sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
