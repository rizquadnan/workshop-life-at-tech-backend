import db from "../../db";

export const getTrainerById = async (trainerId: number) => {
  return await db.trainer.findUnique({ where: { id: trainerId } });
};
