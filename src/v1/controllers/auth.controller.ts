import { CookieOptions, NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import {
  LoginUserInput,
  RegisterUserInput,
  AuthRouteParam,
  authResponseExcludedFields,
} from "../schemas/user.schema";
import { createTrainer, findUniqueTrainer } from "../services/trainer.service";
import { createCustomer } from "../services/customer.service";
import { omit } from "lodash";
import AppError from "../utils/appError";
import { signTokens } from "../utils/jwt";
import config from "config";

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000, // config number * 1 minute
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000, // config number * 1 minute
};

export const registerUserHandler = async (
  req: Request<AuthRouteParam, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userType = req.params.userType;
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const payload = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      rStatus: "ACTIVE" as Prisma.TrainerCreateInput["rStatus"],
      whatsapp: req.body.whatsapp,
    };

    const user = await (userType === "trainer"
      ? createTrainer(payload)
      : createCustomer(payload));

    return res.status(201).json(
      generateJson({
        status: "success",
        data: omit(user, authResponseExcludedFields),
      })
    );
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: "Email already exist, please use another email address",
        });
      }
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<AuthRouteParam, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userType = req.params.userType;

    const user = await (userType === "trainer"
      ? findUniqueTrainer(email.toLowerCase())
      : null);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, "Invalid email or password"));
    }

    const { access_token, refresh_token } = await signTokens(user.id);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(200).json(
      generateJson({
        status: "success",
        data: {
          user: omit(user, authResponseExcludedFields),
          token: access_token
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
