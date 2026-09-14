import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { AppError } from "../utils/AppError.js";

class CityController {

  getRecords = async (req: Request, res: Response) => {
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        countryId: true,
        slug: true,
        image: true,
        infos: {
          select: {
            id: true,
            languageId: true,
            name: true,
            description: true,
            language: {
              select: {
                code: true,
                name: true
              }
            }
          }
        }
      }
    });

    res.json(cities);
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const city = await prisma.city.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        countryId: true,
        slug: true,
        image: true,
        country: true,
        attractions: true,
        infos: {
          select: {
            id: true,
            languageId: true,
            name: true,
            description: true,
            language: {
              select: {
                code: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!city) {
      throw new AppError(404, "City not found");
    }

    res.json(city);
  };

  createRecord = async (req: Request, res: Response) => {
    const {
      countryId,
      slug,
      image
    } = req.body;

    if (!countryId || !slug || !image) {
      throw new AppError(
        400,
        "CountryId, slug and image are required"
      );
    }

    const city = await prisma.city.create({
      data: {
        countryId: Number(countryId),
        slug,
        image
      }
    });

    res.status(201).json(city);
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      countryId,
      slug,
      image
    } = req.body;

    const city = await prisma.city.update({
      where: {
        id: Number(id)
      },
      data: {
        countryId: Number(countryId),
        slug,
        image
      }
    });

    res.status(200).json(city);
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.city.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "City deleted"
    });
  };
}

export const cityController = new CityController();