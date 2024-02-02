import { Prisma } from "@prisma/client";
import db from "../../db";
import { GetExerciseForTrainerResponse } from "../schemas/exercise.schema";

// WORKSHOP-HINT: add create exercise service here

export const getExercisesForTrainer = async (args: {
  trainerId: number;
  exerciseStatus?: Prisma.ExercisesCreateInput["exerciseStatus"];
}) => {
  return (await db.$queryRaw`
    SELECT "Exercises".id,
      "Exercises"."exerciseStatus", 
      "Contract"."trainerId",
      "Contract"."customerId",
      "Contract"."startTime" AS "exerciseStart",
      "Customer".name AS "customerName"
    FROM "Exercises"
    INNER JOIN "Contract" ON "Exercises"."contractId"="Contract".id
    INNER JOIN "Customer" ON "Contract"."customerId"="Customer".id
    WHERE "Contract"."trainerId"=${args.trainerId};`) as GetExerciseForTrainerResponse;
};

export const getExercisesForCustomer = async (args: {
  customerId: number;
  exerciseStatus?: Prisma.ExercisesCreateInput["exerciseStatus"];
}) => {
  return (await db.$queryRaw`
    SELECT "Exercises".id,
      "Exercises"."exerciseStatus", 
      "Contract"."trainerId",
      "Contract"."customerId",
      "Contract"."startTime" AS "exerciseStart",
      "Trainer".name AS "trainerName"
    FROM "Exercises"
    INNER JOIN "Contract" ON "Exercises"."contractId"="Contract".id
    INNER JOIN "Trainer" ON "Contract"."trainerId"="Trainer".id
    WHERE "Contract"."customerId"=${args.customerId};`) as GetExerciseForTrainerResponse;
};

export const patchExercise = async (
  exerciseId: number,
  exerciseStatus: Prisma.ExercisesUpdateInput["exerciseStatus"]
) => {
  return await db.exercises.update({
    where: { id: exerciseId },
    data: { exerciseStatus },
  });
};
