/*
  Warnings:

  - The values [Select] on the enum `question_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `question` MODIFY `type` ENUM('Text', 'MultipleChoice', 'Paragraph', 'Date', 'Checkbox') NOT NULL;
