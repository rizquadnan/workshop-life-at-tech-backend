import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import {
  RegisterUserInput,
  RegisterUserRouteParam,
  responseExcludedFields,
} from "../schemas/user.schema";
import { createTrainer } from "../services/trainer.service";
import { createCustomer } from "../services/customer.service";
import { omit } from "lodash";

export const registerUserHandler = async (
  req: Request<RegisterUserRouteParam, {}, RegisterUserInput>,
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

    res
      .status(201)
      .json(
        generateJson({
          status: "success",
          data: omit(user, responseExcludedFields),
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
