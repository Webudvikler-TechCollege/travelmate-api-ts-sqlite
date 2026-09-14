import { Request, Response } from 'express'
import { prisma } from '../prisma.js'
import bcrypt from 'bcrypt'
import { AppError } from '../utils/AppError.js'

class UserController {

  getRecords = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true
      }
    })

    res.json(users)
  }

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        description: true,
        image: true,
        isActive: true
      }
    })

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    res.json(user)
  }

  createRecord = async (req: Request, res: Response) => {
    const {
      firstname,
      lastname,
      email,
      password,
      description,
      image,
      refreshToken,
      isActive
    } = req.body

    if (!email || !password) {
      throw new AppError(400, 'Email and password are required')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        description,
        image,
        refreshToken,
        isActive: Boolean(isActive)
      }
    })

    res.status(201).json(user)
  }

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params

    const {
      firstname,
      lastname,
      email,
      password,
      description,
      image,
      refreshToken,
      isActive
    } = req.body

    const dataToUpdate: any = {
      firstname,
      lastname,
      email,
      description,
      image,
      refreshToken,
      isActive: Boolean(isActive)
    }

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: dataToUpdate
    })

    res.status(200).json(user)
  }

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).json({
      message: 'User deleted'
    })
  }
}

export const userController = new UserController()