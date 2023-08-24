/*
  Warnings:

  - Added the required column `orgID` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `orgID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
