/*
  Warnings:

  - You are about to alter the column `option` on the `question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `Json`.

*/
-- AlterTable
ALTER TABLE `question` MODIFY `option` JSON NULL;
