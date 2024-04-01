/*
  Warnings:

  - You are about to drop the column `isRequired` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `question` table. All the data in the column will be lost.
  - The values [shortanswer,paragraph,choice,checkbox,date] on the enum `question_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `idElement` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` DROP COLUMN `isRequired`,
    DROP COLUMN `name`,
    ADD COLUMN `idElement` VARCHAR(5) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `option` VARCHAR(500) NULL,
    ADD COLUMN `required` BOOLEAN NOT NULL,
    MODIFY `type` ENUM('Text', 'Number', 'Paragraph', 'Date', 'Select', 'Checkbox') NOT NULL;
