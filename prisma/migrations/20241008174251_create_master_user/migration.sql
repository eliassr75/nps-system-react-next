-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN', 'MASTER') NOT NULL DEFAULT 'USER';
