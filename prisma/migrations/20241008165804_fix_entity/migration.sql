-- AlterTable
ALTER TABLE `NpsResponse` ADD COLUMN `entityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `NpsResponse` ADD CONSTRAINT `NpsResponse_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
