/*
  Warnings:

  - Made the column `idNumber` on table `client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `idNumber` VARCHAR(191) NOT NULL;
