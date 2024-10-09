/*
  Warnings:

  - Added the required column `surveyId` to the `NpsResponse` table without a default value. This is not possible if the table is not empty.
  - Made the column `entityId` on table `NpsResponse` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `NpsResponse` DROP FOREIGN KEY `NpsResponse_entityId_fkey`;

-- AlterTable
ALTER TABLE `NpsResponse` ADD COLUMN `surveyId` INTEGER NOT NULL,
    MODIFY `entityId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Survey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `type` VARCHAR(191) NOT NULL DEFAULT 'minimal',
    `entityId` INTEGER NOT NULL,

    UNIQUE INDEX `Survey_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Survey` ADD CONSTRAINT `Survey_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NpsResponse` ADD CONSTRAINT `NpsResponse_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NpsResponse` ADD CONSTRAINT `NpsResponse_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
