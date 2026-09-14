/*
  Warnings:

  - You are about to drop the `attractionInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cityInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countryInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "attractionInfo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cityInfo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "countryInfo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "country_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "country_info_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "country_info_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "city_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "city_info_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "city_info_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "attraction_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "attraction_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "attraction_info_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "attraction" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "attraction_info_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateIndex
CREATE INDEX "country_info_country_id_idx" ON "country_info"("country_id");

-- CreateIndex
CREATE INDEX "country_info_language_id_idx" ON "country_info"("language_id");

-- CreateIndex
CREATE INDEX "city_info_city_id_idx" ON "city_info"("city_id");

-- CreateIndex
CREATE INDEX "city_info_language_id_idx" ON "city_info"("language_id");

-- CreateIndex
CREATE INDEX "attraction_info_attraction_id_idx" ON "attraction_info"("attraction_id");

-- CreateIndex
CREATE INDEX "attraction_info_language_id_idx" ON "attraction_info"("language_id");
