import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import { loginUserSchema, registerUserSchema } from "../schemas/user.schema";
import {
  loginUserHandler,
  registerUserHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register/:userType((trainer|customer))",
  validate(registerUserSchema),
  registerUserHandler
);

// 1. validate req body
// 2. validate route param
// 3. find user with email
// 4. if found, compare password with saved password
// 5. sign tokens
// 6. if same, return user and token
router.post(
  "/login/:userType((trainer|customer))",
  validate(loginUserSchema),
  loginUserHandler
);

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
