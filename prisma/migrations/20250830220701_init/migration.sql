-- CreateTable
CREATE TABLE "public"."Character" (
    "id" SERIAL NOT NULL,
    "player" TEXT,
    "mortalName" TEXT,
    "faeName" TEXT,
    "rank" TEXT,
    "kith" TEXT,
    "location" TEXT,
    "position" TEXT,
    "seeming" TEXT,
    "house" TEXT,
    "bannerhouse" TEXT,
    "description" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Character_createdAt_idx" ON "public"."Character"("createdAt");
