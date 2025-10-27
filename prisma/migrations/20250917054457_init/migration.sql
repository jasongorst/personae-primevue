-- CreateTable
CREATE TABLE "public"."Character"
(
    "id"                   SERIAL       NOT NULL,
    "player"               TEXT,
    "mortalName"           TEXT,
    "faeName"              TEXT,
    "rank"                 TEXT,
    "kith"                 TEXT,
    "location"             TEXT,
    "position"             TEXT,
    "seeming"              TEXT,
    "house"                TEXT,
    "bannerhouse"          TEXT,
    "description"          TEXT,
    "notes"                TEXT,
    "descriptionPlainText" TEXT         NOT NULL DEFAULT '',
    "notesPlainText"       TEXT         NOT NULL DEFAULT '',
    "createdAt"            TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"            TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patch"
(
    "id"        SERIAL       NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patch" JSONB NOT NULL,

    CONSTRAINT "Patch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Character_createdAt_idx" ON "public"."Character" ("createdAt");

-- CreateIndex
CREATE INDEX "Patch_createdAt_idx" ON "public"."Patch" ("createdAt");
