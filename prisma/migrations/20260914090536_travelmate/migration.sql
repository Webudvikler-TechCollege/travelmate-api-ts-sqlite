/*
  Warnings:

  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "location";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "location_info";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    CONSTRAINT "attraction_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "attraction_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "attraction_info_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "attraction" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "attraction_info_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateIndex
CREATE INDEX "attraction_city_id_idx" ON "attraction"("city_id");

-- CreateIndex
CREATE INDEX "attraction_info_location_id_idx" ON "attraction_info"("location_id");

-- CreateIndex
CREATE INDEX "attraction_info_language_id_idx" ON "attraction_info"("language_id");
