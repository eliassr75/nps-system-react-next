/*
  Warnings:

  - Made the column `updatedAt` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Survey` MODIFY `updatedAt` DATETIME(3) NOT NULL;
