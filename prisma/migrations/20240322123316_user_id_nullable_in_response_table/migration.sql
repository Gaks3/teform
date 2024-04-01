-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `responses_userId_fkey`;

-- AlterTable
ALTER TABLE `responses` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
