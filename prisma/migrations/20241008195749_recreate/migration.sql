/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Survey` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Survey_slug_key` ON `Survey`(`slug`);
