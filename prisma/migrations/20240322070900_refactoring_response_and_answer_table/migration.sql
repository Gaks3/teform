/*
  Warnings:

  - You are about to drop the column `questionId` on the `responses` table. All the data in the column will be lost.
  - Added the required column `userId` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `responses_questionId_fkey`;

-- AlterTable
ALTER TABLE `responses` DROP COLUMN `questionId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
