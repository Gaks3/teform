/*
  Warnings:

  - The primary key for the `form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `form` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_formId_fkey`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `responses_formId_fkey`;

-- DropIndex
DROP INDEX `form_slug_idx` ON `form`;

-- AlterTable
ALTER TABLE `form` DROP PRIMARY KEY,
    DROP COLUMN `slug`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `question` MODIFY `formId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `responses` MODIFY `formId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
