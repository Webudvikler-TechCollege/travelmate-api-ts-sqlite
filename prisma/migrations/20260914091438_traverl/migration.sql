/*
  Warnings:

  - You are about to drop the `attraction_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "attraction_info";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "city_info";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "country_info";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "countryInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "countryInfo_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "countryInfo_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "cityInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "cityInfo_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "cityInfo_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "attractionInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "attractionInfo_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "attraction" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "attractionInfo_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateIndex
CREATE INDEX "countryInfo_country_id_idx" ON "countryInfo"("country_id");

-- CreateIndex
CREATE INDEX "countryInfo_language_id_idx" ON "countryInfo"("language_id");

-- CreateIndex
CREATE INDEX "cityInfo_city_id_idx" ON "cityInfo"("city_id");

-- CreateIndex
CREATE INDEX "cityInfo_language_id_idx" ON "cityInfo"("language_id");

-- CreateIndex
CREATE INDEX "attractionInfo_location_id_idx" ON "attractionInfo"("location_id");

-- CreateIndex
CREATE INDEX "attractionInfo_language_id_idx" ON "attractionInfo"("language_id");
