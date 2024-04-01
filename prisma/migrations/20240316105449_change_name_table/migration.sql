-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `Answers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `Answers_responseId_fkey`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `Questions_formId_fkey`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `Responses_formId_fkey`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `Responses_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `Sessions_userId_fkey`;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `responses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `Users_email_key` TO `users_email_key`;
