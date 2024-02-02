import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import {
  GetExerciseInput,
  PatchExerciseInput,
} from "../schemas/exercise.schema";
import {
  getExercisesForCustomer,
  getExercisesForTrainer,
  patchExercise,
} from "../services/exercise.service";
import { UserType } from "../schemas/auth.schema";

// WORKSHOP-HINT: add post exercise controller here

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
