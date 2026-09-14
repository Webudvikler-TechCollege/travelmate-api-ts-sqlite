# TravelMate API

Et simpelt REST API bygget med **Node.js, Express, TypeScript, Prisma og SQLite**.

API'et indeholder data om lande, byer og seværdigheder samt oversættelser på forskellige sprog.

## Teknologier

* Node.js
* Express
* TypeScript
* Prisma
* SQLite
* Better SQLite3
* CSV seed data

## Installation

Klon projektet og installer dependencies:

```bash
npm install
```

Opret databasen og indsæt seed data:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

Start development serveren:

```bash
npm run dev
```

## Data

API'et arbejder med følgende hovedområder:

* **Countries** – lande
* **Cities** – byer
* **Attractions** – seværdigheder
* **Languages** – sprog
* **CountryInfo** – oversatte landeinformationer
* **CityInfo** – oversatte byinformationer
* **AttractionInfo** – oversatte informationer om seværdigheder

Relationerne kan overordnet beskrives som:

```text
Country
  └── City
       └── Attraction

Language
  ├── CountryInfo
  ├── CityInfo
  └── AttractionInfo
```

## Seed data

Seed data ligger som CSV-filer i:

```text
prisma/csv/
```

Når du kører:

```bash
npx prisma db seed
```

ryddes databasen, hvorefter CSV-data indsættes igen i den korrekte rækkefølge.

## Prisma Studio

Data kan ses og redigeres med Prisma Studio:

```bash
npx prisma studio
```

## Postman Dokumentation
Du kan finde en Postman Dokumentation på følgende link:
https://documenter.getpostman.com/view/6540576/2sBYAytoq6

## Formål
API'et er udviklet som undervisningsprojekt og kan bruges som backend til en TravelMate-applikation bygget eksempelvis med React.
