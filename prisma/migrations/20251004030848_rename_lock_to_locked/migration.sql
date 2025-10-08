/*
  Warnings:

  - You are about to drop the column `lock` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "lock",
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false;
