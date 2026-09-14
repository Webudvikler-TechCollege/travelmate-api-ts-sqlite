import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { AppError } from "../utils/AppError.js";

class CountryController {

  getRecords = async (req: Request, res: Response) => {
    const countries = await prisma.country.findMany({
      select: {
        id: true,
        code: true,
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

    res.json(countries);
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const country = await prisma.country.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        code: true,
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
        },
        cities: true
      }
    });

    if (!country) {
      throw new AppError(404, "Country not found");
    }

    res.json(country);
  };

  createRecord = async (req: Request, res: Response) => {
    const {
      code,
      image
    } = req.body;

    if (!code || !image) {
      throw new AppError(
        400,
        "Code and image are required"
      );
    }

    const country = await prisma.country.create({
      data: {
        code,
        image
      }
    });

    res.status(201).json(country);
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      code,
      image
    } = req.body;

    const country = await prisma.country.update({
      where: {
        id: Number(id)
      },
      data: {
        code,
        image
      }
    });

    res.status(200).json(country);
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.country.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Country deleted"
    });
  };
}

export const countryController = new CountryController();