import { describe, expect, it } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";

import db from "../../db";
import app from "../../server";
describe("/api/v1/auth/change_password", () => {
  describe("[GET] /api/v1/auth/change_password", () => {
    it("should not be accesible if not logged", async () => {
      const { body, status } = await request(app)
        .patch("/api/v1/auth/change_password")
        .send({
          password: "new",
          passwordConfirm: "old",
        });

      expect(status).toBe(401);
      expect(body.status).toBe("fail");
      expect(body.message).toBe("You are not logged in");
    });

    it("should successfully change trainer password", async () => {
      // WORKSHOP-HINT: to test change password you first need to
      // - seed db with a user
      // WORKSHOP-HINT: use this code to set auth headers for testing change password
      // await request(app)
      //   .patch("/api/v1/auth/change_password")
      //   .set({ authorization: `Bearer ${token}` })
      //   .send({
      //     password: newPassword,
      //     passwordConfirm: newPassword,
      //   });
      // WORKSHOP-HINT: use this code to seed db with a user. also to get token
      //  const {
      //    token,
      //    user: { email: userEmail },
      //  } = await createUserAndGetLoginRes({
      //    password: oldPassword,
      //  });
      // WORKSHOP-HINT: use this code to validate some value
      // expect(secondLoginRes.status).toBe(400);
      // expect(secondLoginRes.body.status).toBe("fail");
      // expect(secondLoginRes.body.message).toBe("Invalid email or password");
    });
  });
});
