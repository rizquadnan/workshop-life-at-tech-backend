import { Prisma } from "@prisma/client";
import db from "../../db";
import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../../server";

export const createUserAndGetLoginRes = async (
  trainer: Partial<Prisma.TrainerCreateInput>
) => {
  const user = await db.trainer.create({
    data: {
      name: "Makbul Zanzoa",
      email: "makbul@gmail.com",
      password: await bcrypt.hash(trainer.password ?? "rahasia123", 12),
      whatsapp: "088416231731",
      rStatus: "ACTIVE",
    },
  });

  const firstLoginRes = await request(app)
    .post("/api/v1/auth/login/trainer")
    .send({
      email: user.email,
      password: trainer.password ?? "rahasia123",
    });

  return {
    token: firstLoginRes.body.data.token,
    user: {
      email: firstLoginRes.body.data.user.email,
      id: firstLoginRes.body.data.user.id,
    },
  };
};
