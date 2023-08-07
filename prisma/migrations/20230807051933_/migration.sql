/*
  Warnings:

  - You are about to drop the column `category_name` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryname` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `category_name`,
    ADD COLUMN `categoryname` VARCHAR(191) NOT NULL;
