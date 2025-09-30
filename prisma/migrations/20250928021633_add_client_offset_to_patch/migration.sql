/*
  Warnings:

  - A unique constraint covering the columns `[clientOffset]` on the table `Patch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientOffset` to the `Patch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Patch" ADD COLUMN     "clientOffset" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patch_clientOffset_key" ON "public"."Patch"("clientOffset");
