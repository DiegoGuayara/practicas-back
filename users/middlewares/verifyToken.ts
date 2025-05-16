import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(500).json({ status: "Se necesita el Header" });
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(500).json({ status: "No se ha ingresado el token" });
    return;
  }

  try {
    const secreyKey = "your_secret_key";
    const decoded: any = jwt.verify(token, secreyKey);

    req.body.id = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({
      status: "Sin acceso",
    });
  }
};
