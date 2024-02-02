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
      const oldPassword = "rahasia123";
      const newPassword = "123rahasia";

      const user = await db.trainer.create({
        data: {
          name: "Makbul Zanzoa",
          email: "makbul@gmail.com",
          password: await bcrypt.hash(oldPassword, 12),
          whatsapp: "088416231731",
          rStatus: "ACTIVE",
        },
      });

      const firstLoginRes = await request(app)
        .post("/api/v1/auth/login/trainer")
        .send({
          email: user.email,
          password: oldPassword,
        });

      await request(app)
        .patch("/api/v1/auth/change_password")
        .set({ authorization: `Bearer ${firstLoginRes.body.data.token}` })
        .send({
          password: newPassword,
          passwordConfirm: newPassword,
        });

      // check login with old password, should fail
      const secondLoginRes = await request(app)
        .post("/api/v1/auth/login/trainer")
        .send({
          email: user.email,
          password: oldPassword,
        });

      expect(secondLoginRes.status).toBe(400);
      expect(secondLoginRes.body.status).toBe("fail");
      expect(secondLoginRes.body.message).toBe("Invalid email or password");

      // check login with new password, should succeed
      const thirdLoginRes = await request(app)
        .post("/api/v1/auth/login/trainer")
        .send({
          email: user.email,
          password: newPassword,
        });

      expect(thirdLoginRes.status).toBe(200);
      expect(thirdLoginRes.body.status).toBe("success");
      expect(thirdLoginRes.body.data).toBeTruthy();
    });
  });
});
