import { describe, expect, it } from "vitest";
import request from "supertest";

import db from "../../db";
import app from "../../server";
import { createUserAndGetLoginRes } from "../../tests/helpers/auth";
import { generateContractTime } from "../controllers/contract.controller";

describe("/api/v1/exercise", () => {
  describe("[POST] /api/v1/exercises", () => {
    it("should not be accesible if not logged", async () => {
      const { body, status } = await request(app)
        .post("/api/v1/exercises")
        .send({
          password: "new",
          passwordConfirm: "old",
        });

      expect(status).toBe(401);
      expect(body.status).toBe("fail");
      expect(body.message).toBe("You are not logged in");
    });

    it("should create exercise", async () => {
      const { token, user: trainer } = await createUserAndGetLoginRes({
        email: "for_create_exercise@gmail.com",
      });

      const customer = await db.customer.create({
        data: {
          email: "jd@gmail.com",
          name: "Jio darno",
          password: "jiodarno",
          rStatus: "ACTIVE",
          whatsapp: "084123123",
        },
      });

      const contractTime = generateContractTime(30);
      const contract = await db.contract.create({
        data: {
          customerId: customer.id,
          trainerId: trainer.id,
          amount_of_exercise: 12,
          startTime: contractTime.startTime,
          endTime: contractTime.endTime,
        },
      });

      const { body, status } = await request(app)
        .post("/api/v1/exercises")
        .set({ authorization: `Bearer ${token}` })
        .send({
          contractId: contract.id,
        });

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.data.exerciseStatus).toBe("ACTIVE");
    });
  });
});
