import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { AppError } from "../utils/AppError.js";

class AttractionController {

  getRecords = async (req: Request, res: Response) => {
    const attractions = await prisma.attraction.findMany({
      select: {
        id: true,
        cityId: true,
        slug: true,
        image: true,
        latitude: true,
        longitude: true,
        address: true,
        website: true
      }
    });

    res.json(attractions);
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const attraction = await prisma.attraction.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        cityId: true,
        slug: true,
        image: true,
        latitude: true,
        longitude: true,
        address: true,
        website: true,
        city: true,
        infos: true
      }
    });

    if (!attraction) {
      throw new AppError(404, "Attraction not found");
    }

    res.json(attraction);
  };

  createRecord = async (req: Request, res: Response) => {
    const {
      cityId,
      slug,
      image,
      latitude,
      longitude,
      address,
      website
    } = req.body;

    if (
      !cityId ||
      !slug ||
      !image ||
      latitude === undefined ||
      longitude === undefined ||
      !address ||
      !website
    ) {
      throw new AppError(
        400,
        "CityId, slug, image, latitude, longitude, address and website are required"
      );
    }

    const attraction = await prisma.attraction.create({
      data: {
        cityId: Number(cityId),
        slug,
        image,
        latitude: Number(latitude),
        longitude: Number(longitude),
        address,
        website
      }
    });

    res.status(201).json(attraction);
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      cityId,
      slug,
      image,
      latitude,
      longitude,
      address,
      website
    } = req.body;

    const attraction = await prisma.attraction.update({
      where: {
        id: Number(id)
      },
      data: {
        cityId: Number(cityId),
        slug,
        image,
        latitude: Number(latitude),
        longitude: Number(longitude),
        address,
        website
      }
    });

    res.status(200).json(attraction);
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.attraction.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Attraction deleted"
    });
  };
}

export const attractionController = new AttractionController();