/*
  Warnings:

  - Made the column `player` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mortalName` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faeName` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rank` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kith` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seeming` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `house` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bannerhouse` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Character"
    ALTER COLUMN "player" SET NOT NULL,
    ALTER COLUMN "player" SET DEFAULT '',
    ALTER COLUMN "mortalName" SET NOT NULL,
    ALTER COLUMN "mortalName" SET DEFAULT '',
    ALTER COLUMN "faeName" SET NOT NULL,
    ALTER COLUMN "faeName" SET DEFAULT '',
    ALTER COLUMN "rank" SET NOT NULL,
    ALTER COLUMN "rank" SET DEFAULT '',
    ALTER COLUMN "kith" SET NOT NULL,
    ALTER COLUMN "kith" SET DEFAULT '',
    ALTER COLUMN "location" SET NOT NULL,
    ALTER COLUMN "location" SET DEFAULT '',
    ALTER COLUMN "position" SET NOT NULL,
    ALTER COLUMN "position" SET DEFAULT '',
    ALTER COLUMN "seeming" SET NOT NULL,
    ALTER COLUMN "seeming" SET DEFAULT '',
    ALTER COLUMN "house" SET NOT NULL,
    ALTER COLUMN "house" SET DEFAULT '',
    ALTER COLUMN "bannerhouse" SET NOT NULL,
    ALTER COLUMN "bannerhouse" SET DEFAULT '',
    ALTER COLUMN "description" SET DEFAULT '',
    ALTER COLUMN "notes" SET DEFAULT '';
