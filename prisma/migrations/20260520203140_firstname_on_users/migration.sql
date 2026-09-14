/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL DEFAULT 'Tim',
    "lastname" TEXT NOT NULL DEFAULT 'Vinther Sørensen',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "refreshToken" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_users" ("description", "email", "id", "image", "isActive", "password", "refreshToken") SELECT "description", "email", "id", "image", "isActive", "password", "refreshToken" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
