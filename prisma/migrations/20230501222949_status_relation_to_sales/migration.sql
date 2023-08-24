/*
  Warnings:

  - Added the required column `statusID` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` ADD COLUMN `statusID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_statusID_fkey` FOREIGN KEY (`statusID`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
