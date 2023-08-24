-- DropForeignKey
ALTER TABLE `producttosale` DROP FOREIGN KEY `producttosale_productID_fkey`;

-- DropForeignKey
ALTER TABLE `producttosale` DROP FOREIGN KEY `producttosale_saleID_fkey`;

-- AddForeignKey
ALTER TABLE `producttosale` ADD CONSTRAINT `producttosale_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producttosale` ADD CONSTRAINT `producttosale_saleID_fkey` FOREIGN KEY (`saleID`) REFERENCES `sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
