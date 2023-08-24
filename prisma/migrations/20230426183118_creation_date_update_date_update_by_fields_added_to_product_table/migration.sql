/*
  Warnings:

  - Added the required column `creation_date` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `creation_date` DATETIME(3) NOT NULL,
    ADD COLUMN `update_by` VARCHAR(191) NULL,
    ADD COLUMN `update_date` DATETIME(3) NULL;
