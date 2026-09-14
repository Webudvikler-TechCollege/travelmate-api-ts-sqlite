import "dotenv/config";
import path from "path";
import { readdir, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});

const prisma = new PrismaClient({
  adapter
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname, "csv");

// Seed-rækkefølge
const order = [
  "language",
  "country",
  "countryInfo",
  "city",
  "cityInfo",
  "attraction",
  "attractionInfo"
] as const;

type SeedModelName = typeof order[number];

type FieldType = "string" | "number" | "boolean" | "date";

/*
  Felttyper bruger Prisma-feltnavne.
  Fx countryId og ikke country_id.
*/
const fieldTypes: Record<
  SeedModelName,
  Record<string, FieldType>
> = {
  language: {
    id: "number",
    code: "string",
    name: "string"
  },

  country: {
    id: "number",
    code: "string",
    image: "string"
  },

  countryInfo: {
    id: "number",
    countryId: "number",
    languageId: "number",
    name: "string",
    description: "string"
  },

  city: {
    id: "number",
    countryId: "number",
    slug: "string",
    image: "string"
  },

  cityInfo: {
    id: "number",
    cityId: "number",
    languageId: "number",
    name: "string",
    description: "string"
  },

  attraction: {
    id: "number",
    cityId: "number",
    slug: "string",
    image: "string",
    latitude: "number",
    longitude: "number",
    address: "string",
    website: "string"
  },

  attractionInfo: {
    id: "number",
    attractionId: "number",
    languageId: "number",
    name: "string",
    description: "string"
  }
};

/*
  Mapping mellem CSV/databasenavne
  og Prisma-feltnavne.
*/
const fieldMap: Record<string, string> = {
  country_id: "countryId",
  city_id: "cityId",
  language_id: "languageId",
  attraction_id: "attractionId"
};

// Prisma-modeller
const models = {
  language: prisma.language,
  country: prisma.country,
  countryInfo: prisma.countryInfo,
  city: prisma.city,
  cityInfo: prisma.cityInfo,
  attraction: prisma.attraction,
  attractionInfo: prisma.attractionInfo
};

async function main() {
  try {
    console.log("Clearing database...");

    // Slet i reverse order pga. relationer
    for (const modelName of [...order].reverse()) {
      console.log(`Deleting ${modelName}...`);

      const model = models[modelName];

      await (model as any).deleteMany();
    }

    console.log("Database cleared\n");

    const files = await readdir(directory);

    for (const modelName of order) {
      const fileName = `${modelName}.csv`;

      if (!files.includes(fileName)) {
        console.log(`Skipping ${modelName} - ${fileName} findes ikke`);
        continue;
      }

      console.log(`Seeding ${modelName}...`);

      const fullPath = path.join(directory, fileName);

      const content = await readFile(
        fullPath,
        "utf-8"
      );

      const rawRecords = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }) as Record<string, string>[];

      const cleanedData = rawRecords.map(row =>
        castRow(modelName, row)
      );

      const model = models[modelName];

      await (model as any).createMany({
        data: cleanedData
      });

      console.log(
        `${modelName} seeded (${cleanedData.length} rows)\n`
      );
    }

    console.log("SEED COMPLETE");
  } catch (error) {
    console.error("SEED FAILED:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

// Konverter en CSV-række
const castRow = (
  model: SeedModelName,
  row: Record<string, string>
) => {
  const schema = fieldTypes[model];

  const converted: Record<string, any> = {};

  for (const [csvKey, value] of Object.entries(row)) {

    // Konverter fx country_id → countryId
    const key = fieldMap[csvKey] ?? csvKey;

    const type = schema[key] ?? "string";

    const val = value?.trim();

    if (type === "number") {
      converted[key] = Number(val);
    }

    else if (type === "boolean") {
      converted[key] =
        val === "1" ||
        val === "true";
    }

    else if (type === "date") {
      converted[key] = new Date(val);
    }

    else {
      converted[key] = val;
    }
  }

  return converted;
};

main();