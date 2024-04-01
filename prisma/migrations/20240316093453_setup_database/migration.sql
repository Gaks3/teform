-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `isAnonymous` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('shortanswer', 'paragraph', 'choice', 'checkbox', 'date') NOT NULL,
    `isRequired` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `responseId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `Forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `Forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `Responses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
