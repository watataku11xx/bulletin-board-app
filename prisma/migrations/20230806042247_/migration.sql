/*
  Warnings:

  - You are about to drop the column `categoryname` on the `category` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `categoryname`,
    ADD COLUMN `category_name` VARCHAR(191) NOT NULL;
