-- DropForeignKey
ALTER TABLE `producttosale` DROP FOREIGN KEY `producttosale_productID_fkey`;

-- AddForeignKey
ALTER TABLE `producttosale` ADD CONSTRAINT `producttosale_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
