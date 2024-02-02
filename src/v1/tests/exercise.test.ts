import { describe, expect, it } from "vitest";
import request from "supertest";

import db from "../../db";
import app from "../../server";
// WORKSHOP-HINT: use this import for the test
// import { createUserAndGetLoginRes } from "../../tests/helpers/auth";
// import { generateContractTime } from "../controllers/contract.controller";

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
      // WORKSHOP-HINT: to create exercise need to:
      // - seed db with trainer
      // - seed db with customer
      // - seed db with contract
    });
  });
});
