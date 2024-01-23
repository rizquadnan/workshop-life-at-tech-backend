import { Prisma } from "@prisma/client";
import db from "../../db";

export const createTrainer = async (input: Prisma.TrainerCreateInput) => {
  return await db.trainer.create({
    data: input,
  });
};

export const findUniqueTrainerByEmail = async (email: string) => {
  return await db.trainer.findUnique({ where: { email } });
};

export const findUniqueTrainerById = async (id: number) => {
  return await db.trainer.findUnique({ where: { id } });
};
