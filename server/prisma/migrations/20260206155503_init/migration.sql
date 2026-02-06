-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('AVAILABLE', 'EMPLOYED', 'FREELANCE', 'RETIRED');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('HR', 'MARKETING', 'SALES', 'RESEARCH', 'C_SUITE', 'SECURITY', 'IT', 'MIDDLE_MANAGEMENT', 'FINANCE', 'FACILITIES', 'LEGAL');

-- CreateEnum
CREATE TYPE "ClearanceLevel" AS ENUM ('STANDARD', 'ENHANCED', 'SECRET', 'TOP_SECRET', 'COSMIC');

-- CreateEnum
CREATE TYPE "PositionStatus" AS ENUM ('OPEN', 'FILLED', 'ON_HOLD');

-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "intelligence" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "durability" INTEGER NOT NULL DEFAULT 0,
    "power" INTEGER NOT NULL DEFAULT 0,
    "combat" INTEGER NOT NULL DEFAULT 0,
    "fullName" TEXT NOT NULL DEFAULT '',
    "alterEgos" TEXT NOT NULL DEFAULT '',
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "placeOfBirth" TEXT NOT NULL DEFAULT '',
    "firstAppearance" TEXT NOT NULL DEFAULT '',
    "publisher" TEXT NOT NULL DEFAULT '',
    "alignment" TEXT NOT NULL DEFAULT '',
    "gender" TEXT NOT NULL DEFAULT '',
    "race" TEXT NOT NULL DEFAULT '',
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "eyeColor" TEXT NOT NULL DEFAULT '',
    "hairColor" TEXT NOT NULL DEFAULT '',
    "occupation" TEXT NOT NULL DEFAULT '',
    "base" TEXT NOT NULL DEFAULT '',
    "groupAffiliation" TEXT NOT NULL DEFAULT '',
    "relatives" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "availability" "Availability" NOT NULL DEFAULT 'AVAILABLE',
    "currentTitle" TEXT,
    "aiPersonalitySummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "salaryMin" INTEGER NOT NULL,
    "salaryMax" INTEGER NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Megacorp Tower, Patriot City',
    "clearanceLevel" "ClearanceLevel" NOT NULL DEFAULT 'STANDARD',
    "status" "PositionStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroPositionMatch" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "reasoning" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeroPositionMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_slug_key" ON "Hero"("slug");

-- CreateIndex
CREATE INDEX "Hero_name_idx" ON "Hero"("name");

-- CreateIndex
CREATE INDEX "Hero_publisher_idx" ON "Hero"("publisher");

-- CreateIndex
CREATE INDEX "Hero_alignment_idx" ON "Hero"("alignment");

-- CreateIndex
CREATE INDEX "Hero_availability_idx" ON "Hero"("availability");

-- CreateIndex
CREATE INDEX "Position_department_idx" ON "Position"("department");

-- CreateIndex
CREATE INDEX "Position_status_idx" ON "Position"("status");

-- CreateIndex
CREATE INDEX "HeroPositionMatch_heroId_idx" ON "HeroPositionMatch"("heroId");

-- CreateIndex
CREATE INDEX "HeroPositionMatch_positionId_idx" ON "HeroPositionMatch"("positionId");

-- CreateIndex
CREATE INDEX "HeroPositionMatch_score_idx" ON "HeroPositionMatch"("score");

-- CreateIndex
CREATE UNIQUE INDEX "HeroPositionMatch_heroId_positionId_key" ON "HeroPositionMatch"("heroId", "positionId");

-- AddForeignKey
ALTER TABLE "HeroPositionMatch" ADD CONSTRAINT "HeroPositionMatch_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroPositionMatch" ADD CONSTRAINT "HeroPositionMatch_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
