/*
  Warnings:

  - Added the required column `value` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `value` INTEGER NOT NULL,
    MODIFY `comment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
