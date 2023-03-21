import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { AppError } from "../apperror";

const verifyTokenExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken: string = req.headers.authorization;

  const token = authToken?.split(" ")[1];

  if (!token) throw new AppError("Invalid token.", 401);

  const decoded = decode(token);

  if (!decoded) throw new AppError("Invalid token.", 401);

  req.userToken = token;
  req.clientId = String(decoded.sub);

  next();
};

export default verifyTokenExistsMiddleware;
