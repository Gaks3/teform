-- DropForeignKey
ALTER TABLE `form` DROP FOREIGN KEY `form_userId_fkey`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `responses_userId_fkey`;

-- AddForeignKey
ALTER TABLE `form` ADD CONSTRAINT `form_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
