/*
  Warnings:

  - You are about to drop the column `locked` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `lockedAt` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `lockedBy` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character"
    DROP COLUMN "locked",
    DROP COLUMN "lockedAt",
    DROP COLUMN "lockedBy";
