import { Prisma } from "@prisma/client";
import db from "../../db";

export const createExercise = async (exercise: Prisma.ExercisesCreateInput) => {
  return await db.exercises.create({ data: exercise });
};
