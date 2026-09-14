import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { AppError } from "../utils/AppError.js";

class LanguageController {

  getRecords = async (req: Request, res: Response) => {
    const languages = await prisma.language.findMany({
      select: {
        id: true,
        code: true,
        name: true
      }
    });

    res.json(languages);
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const language = await prisma.language.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        code: true,
        name: true,
        countryInfos: true,
        cityInfos: true,
        attractionInfos: true
      }
    });

    if (!language) {
      throw new AppError(404, "Language not found");
    }

    res.json(language);
  };

  createRecord = async (req: Request, res: Response) => {
    const {
      code,
      name
    } = req.body;

    if (!code || !name) {
      throw new AppError(
        400,
        "Code and name are required"
      );
    }

    const language = await prisma.language.create({
      data: {
        code,
        name
      }
    });

    res.status(201).json(language);
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      code,
      name
    } = req.body;

    const language = await prisma.language.update({
      where: {
        id: Number(id)
      },
      data: {
        code,
        name
      }
    });

    res.status(200).json(language);
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.language.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Language deleted"
    });
  };
}

export const languageController = new LanguageController();