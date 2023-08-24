/*
  Warnings:

  - You are about to drop the column `costo_total` on the `sale` table. All the data in the column will be lost.
  - Added the required column `total_cost` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `costo_total`,
    ADD COLUMN `total_cost` DOUBLE NOT NULL;
