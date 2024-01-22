import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import { registerUserSchema } from "../schemas/user.schema";
import { registerUserHandler } from "../controllers/auth.controller";

const router = Router();

  // 1. validate req body
  // 2. hash password
  // 3. call service to save user
  // 4. send response

router.post(
  "/register/:userType((trainer|customer))",
  validate(registerUserSchema),
  registerUserHandler
);

router.post("/login", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "login in development",
    })
  );
});

router.get("/refresh", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "refresh in development",
    })
  );
});

router.get("/logout", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "logout in development",
    })
  );
});

router.post("/forgot_password", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "forgot_password in development",
    })
  );
});

router.patch("/reset_password/:reset", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "reset_password in development",
    })
  );
});

export default router;
