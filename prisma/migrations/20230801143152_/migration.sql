/*
  Warnings:

  - You are about to drop the column `value` on the `comment` table. All the data in the column will be lost.
  - Added the required column `comment_value` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `value`,
    ADD COLUMN `comment_value` INTEGER NOT NULL;
