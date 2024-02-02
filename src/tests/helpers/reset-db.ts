import db from "./db";

export default async () => {
  await db.$transaction([
    db.exercises.deleteMany(),
    db.contract.deleteMany(),
    db.customer.deleteMany(),
    db.trainer.deleteMany(),
  ]);
};
