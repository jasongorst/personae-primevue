/*
  Warnings:

  - Made the column `description` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Character"
    ALTER COLUMN "description" SET NOT NULL,
    ALTER COLUMN "notes" SET NOT NULL;
