import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import {
  CreateExerciseInput,
  GetExerciseInput,
  PatchExerciseInput,
} from "../schemas/exercise.schema";
import {
  createExercise,
  getExercisesForCustomer,
  getExercisesForTrainer,
  patchExercise,
} from "../services/exercise.service";
import {
  getContractById,
  getContractsByTrainerCustomerId,
} from "../services/contract.service";
import { UserType } from "../schemas/auth.schema";
import { Prisma } from "@prisma/client";

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

export const getTrainerExercisesHandler = async (
  req: Request<{}, {}, {}, GetExerciseInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userType = res.locals.userType as UserType;

    const exercises = await (userType === "trainer"
      ? getExercisesForTrainer({
          trainerId: user.id as number,
        })
      : getExercisesForCustomer({ customerId: user.id as number }));

    return res.status(200).json(
      generateJson({
        status: "success",
        data: exercises,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const patchExerciseHandler = async (
  req: Request<PatchExerciseInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userType = res.locals.userType as UserType;

    const exerciseId = req.params.exerciseId;

    const result = await patchExercise(
      Number(exerciseId),
      userType === "trainer" ? "PENDING" : "FINISHED"
    );

    return res.status(200).json(
      generateJson({
        status: "success",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};
