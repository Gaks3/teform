/*
  Warnings:

  - You are about to drop the column `formId` on the `answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_formId_fkey`;

-- AlterTable
ALTER TABLE `answers` DROP COLUMN `formId`;
