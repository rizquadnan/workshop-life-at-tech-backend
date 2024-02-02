import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../server";

describe("/v1/health_check", () => {
  describe("[GET] /v1/health_check", () => {
    it("should return success response", async () => {
      const { body, status } = await request(app)
        .get("/api/v1/health_check")
        .send();

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.message).toBe("Welcome to Baret PT API");
    });
  });
});
