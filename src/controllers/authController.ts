import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { prisma } from "../prisma.js"
import { AppError } from "../utils/AppError.js"

declare global {
  namespace Express {
    interface Request {
      user?: { id: number }
    }
  }
}

interface JwtPayload {
  exp: number
  data: {
    id: number
  }
}

class AuthController {

  generateToken = (
    user: { id: number },
    type: "access" | "refresh"
  ) => {

    const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`]
    const expiresIn = process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`]

    if (!key || !expiresIn) {
      throw new AppError(500, `Missing env vars for ${type} token`)
    }

    const exp = Math.floor(Date.now() / 1000) + Number(expiresIn)

    return jwt.sign(
      {
        exp,
        data: {
          id: user.id
        }
      },
      key
    )
  }

  authenticate = async (req: Request, res: Response) => {

    const { username, password } = req.body

    if (!username || !password) {
      throw new AppError(400, "Missing credentials")
    }

    const user = await prisma.user.findFirst({
      where: {
        email: username,
        isActive: true
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        password: true
      }
    })

    if (!user) {
      throw new AppError(401, "Invalid username or password")
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      throw new AppError(401, "Invalid username or password")
    }

    const refreshToken = this.generateToken(user, "refresh")
    const accessToken = this.generateToken(user, "access")

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken
      }
    })

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      }
    })
  }

  refreshAccessToken = async (req: Request, res: Response) => {

    const { refreshToken } = req.body

    if (!refreshToken) {
      throw new AppError(400, "Refresh token required")
    }

    const user = await prisma.user.findFirst({
      where: {
        refreshToken
      }
    })

    if (!user) {
      throw new AppError(401, "Invalid refresh token")
    }

    try {
      jwt.verify(
        refreshToken,
        process.env.TOKEN_REFRESH_KEY!
      )
    } catch {
      throw new AppError(403, "Invalid or expired refresh token")
    }

    const newRefreshToken = this.generateToken(user, "refresh")
    const accessToken = this.generateToken(user, "access")

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    })
  }

  getUserFromToken = (req: Request, res: Response) => {

    const bearerHeader = req.headers["authorization"]

    if (!bearerHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Token required")
    }

    const token = bearerHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_ACCESS_KEY!
      ) as JwtPayload

      res.json({
        userId: decoded.data.id
      })

    } catch {
      throw new AppError(401, "Invalid or expired token")
    }
  }

  authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const bearerHeader = req.headers["authorization"]

    if (!bearerHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Token not accepted")
    }

    const token = bearerHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_ACCESS_KEY!
      ) as JwtPayload

      req.user = decoded.data

      next()

    } catch {
      throw new AppError(403, "Invalid or expired token")
    }
  }

  logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await prisma.user.updateMany({
        where: { refreshToken },
        data: { refreshToken: "" },
      });
    }

    return res.sendStatus(204);
  };  
}

export const authController = new AuthController()