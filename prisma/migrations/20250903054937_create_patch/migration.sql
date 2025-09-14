-- CreateTable
CREATE TABLE "public"."Patch" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patch" JSONB NOT NULL,

    CONSTRAINT "Patch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Patch_createdAt_idx" ON "public"."Patch"("createdAt");
