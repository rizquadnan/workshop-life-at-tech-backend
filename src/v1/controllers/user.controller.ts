import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import { PatchExerciseInput } from "../schemas/exercise.schema";
import { UserType, authResponseExcludedFields } from "../schemas/auth.schema";
import { updateTrainer } from "../services/auth.trainer.service";
import { updateCustomer } from "../services/auth.customer.service";
import { PatchMeInput } from "../schemas/user.schema";
import { omit } from "lodash";

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).json(
      generateJson({
        status: "success",
        data: user,
      })
    );
  } catch (err: any) {
    next(err);
  }
};

export const patchMeHandler = async (
  req: Request<{}, {}, PatchMeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userType = res.locals.user as UserType;

    const { email, name, whatsapp } = req.body;

    if (!email && !name && !whatsapp) {
      return res.status(400).json(
        generateJson({
          status: "fail",
          message: "All fields are unchanged",
        })
      );
    }

    const modified = await (userType === "trainer"
      ? updateTrainer(
          {
            id: user.id,
          },
          {
            email,
            name,
            whatsapp,
          }
        )
      : updateCustomer(
          {
            id: user.id,
          },
          {
            email,
            name,
            whatsapp,
          }
        ));

    res.status(200).json(
      generateJson({
        status: "success",
        data: omit(modified, authResponseExcludedFields),
      })
    );
  } catch (error) {
    next(error);
  }
};
