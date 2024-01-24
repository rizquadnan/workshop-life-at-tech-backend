import { Prisma, Trainer } from "@prisma/client";
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

export const findTrainerForPasswordReset = async (passwordResetToken: string) => {
  return await db.trainer.findFirst({
    where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
  });
};

export const updateTrainer = async (
  where: Prisma.TrainerWhereUniqueInput,
  data: Prisma.TrainerUpdateInput,
  select?: Prisma.TrainerSelect
) => {
  return await db.trainer.update({ where, data, select });
};
