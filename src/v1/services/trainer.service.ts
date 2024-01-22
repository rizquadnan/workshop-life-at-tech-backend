import { Prisma } from "@prisma/client";
import db from "../../db";

export const createTrainer = async (input: Prisma.TrainerCreateInput) => {
  return (await db.trainer.create({
    data: input,
  }));
};
