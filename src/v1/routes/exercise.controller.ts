import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import { CreateExerciseInput } from "../schemas/exercise.schema";
import { createExercise } from "../services/exercise.service";
import { getContractById } from "../services/contract.service";

export const createExerciseHandler = async (
  req: Request<{}, {}, CreateExerciseInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const contract = await getContractById(req.body.contractId);

    if (!contract) {
      return res
        .status(404)
        .json(generateJson({ status: "fail", message: "Contract not found." }));
    }

    const exercise = await createExercise({
      contract: { connect: { id: req.body.contractId } },
      startTime: new Date(),
      exerciseStatus: "ACTIVE",
    });

    return res.status(200).json(
      generateJson({
        status: "success",
        data: exercise,
      })
    );
  } catch (err: any) {
    next(err);
  }
};
