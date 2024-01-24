import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import { UserType, authResponseExcludedFields } from "../schemas/auth.schema";
import { findUniqueTrainerById } from "../services/auth.trainer.service";
import { findUniqueCustomerById } from "../services/auth.customer.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: number; userType: UserType }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if the user still exist
    const user = await (decoded.userType === "trainer"
      ? findUniqueTrainerById(decoded.sub)
      : findUniqueCustomerById(decoded.sub));

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Add user to res.locals
    res.locals.user = omit(user, authResponseExcludedFields);

    next();
  } catch (err: any) {
    next(err);
  }
};
