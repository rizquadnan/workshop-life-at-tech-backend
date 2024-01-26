import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userType = res.locals.userType;

    if (!user || !userType) {
      return next(
        new AppError(400, `Session has expired or user doesn't exist`)
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
