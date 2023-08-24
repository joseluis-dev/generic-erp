/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_organizationtouser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idNumber` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_organizationtouser` DROP FOREIGN KEY `_organizationTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_organizationtouser` DROP FOREIGN KEY `_organizationTouser_B_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `idNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_organizationtouser`;

-- CreateTable
CREATE TABLE `organizationtouser` (
    `userID` VARCHAR(191) NOT NULL,
    `orgID` VARCHAR(191) NOT NULL,
    `rol` ENUM('NORMAL', 'ADMIN', 'MASTER') NOT NULL DEFAULT 'NORMAL',

    PRIMARY KEY (`userID`, `orgID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_idNumber_key` ON `user`(`idNumber`);

-- AddForeignKey
ALTER TABLE `organizationtouser` ADD CONSTRAINT `organizationtouser_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizationtouser` ADD CONSTRAINT `organizationtouser_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
