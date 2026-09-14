/*
  Warnings:

  - You are about to drop the `bagsizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `slides` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bagsizes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bookings";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "reviews";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "slides";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "trips";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "city" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "city_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    CONSTRAINT "location_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

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
CREATE TABLE "location_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "location_info_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "location_info_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateIndex
CREATE INDEX "city_country_id_idx" ON "city"("country_id");

-- CreateIndex
CREATE INDEX "location_city_id_idx" ON "location"("city_id");

-- CreateIndex
CREATE INDEX "country_info_country_id_idx" ON "country_info"("country_id");

-- CreateIndex
CREATE INDEX "country_info_language_id_idx" ON "country_info"("language_id");

-- CreateIndex
CREATE INDEX "city_info_city_id_idx" ON "city_info"("city_id");

-- CreateIndex
CREATE INDEX "city_info_language_id_idx" ON "city_info"("language_id");

-- CreateIndex
CREATE INDEX "location_info_location_id_idx" ON "location_info"("location_id");

-- CreateIndex
CREATE INDEX "location_info_language_id_idx" ON "location_info"("language_id");
