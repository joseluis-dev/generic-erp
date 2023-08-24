/*
  Warnings:

  - The primary key for the `producttosale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `producttosale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `producttosale` DROP PRIMARY KEY,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);