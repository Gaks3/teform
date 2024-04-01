/*
  Warnings:

  - Added the required column `formId` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_responseId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_formId_fkey`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `responses_formId_fkey`;

-- AlterTable
ALTER TABLE `answers` ADD COLUMN `formId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `responses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
