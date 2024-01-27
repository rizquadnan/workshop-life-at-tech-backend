import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import { UserType, authResponseExcludedFields } from "../schemas/auth.schema";
import {
  getActiveContracts,
  getContractById,
  getContractsByTrainerCustomerId,
} from "../services/contract.service";
import { getTrainerById } from "../services/trainer.service";
import { omit } from "lodash";

export const getTrainerHandler = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const contracts = await getActiveContracts(user.id as number);

    if (contracts.length === 0) {
      return res.status(404).json(
        generateJson({
          status: "fail",
          message: "Contract not found.",
        })
      );
    }

    const latestContract = contracts[0];

    const trainer = await getTrainerById(latestContract.trainerId);

    if (!trainer) {
      return res.status(404).json(
        generateJson({
          status: "fail",
          message: "Trainer not found.",
        })
      );
    }

    return res.status(200).json(
      generateJson({
        status: "success",
        data: omit(trainer, authResponseExcludedFields),
      })
    );
  } catch (error) {
    next(error);
  }
};
