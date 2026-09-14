-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Ikke navngivet',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "refreshToken" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "trips" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "addressDeparture" TEXT NOT NULL,
    "cityDeparture" TEXT NOT NULL,
    "addressDestination" TEXT NOT NULL,
    "cityDestination" TEXT NOT NULL,
    "routeDeviation" INTEGER NOT NULL,
    "seatsTotal" INTEGER NOT NULL,
    "pricePerSeat" DECIMAL NOT NULL,
    "bagSizeId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "allowChildren" BOOLEAN NOT NULL,
    "allowSmoking" BOOLEAN NOT NULL,
    "allowMusic" BOOLEAN NOT NULL,
    "allowPets" BOOLEAN NOT NULL,
    "hasComfort" BOOLEAN NOT NULL,
    "useFerry" BOOLEAN NOT NULL,
    "isElectric" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "trips_bagSizeId_fkey" FOREIGN KEY ("bagSizeId") REFERENCES "bagsizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tripId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "numSeats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookings_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numStars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "reviewedUserId" INTEGER NOT NULL,
    CONSTRAINT "reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_reviewedUserId_fkey" FOREIGN KEY ("reviewedUserId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bagsizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "slides" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
