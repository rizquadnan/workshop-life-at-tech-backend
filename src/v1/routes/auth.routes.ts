import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema";
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register/:userType((trainer|customer))",
  validate(registerUserSchema),
  registerUserHandler
);

router.post(
  "/login/:userType((trainer|customer))",
  validate(loginUserSchema),
  loginUserHandler
);

router.post(
  "/refresh/:userType((trainer|customer))",
  refreshAccessTokenHandler
);

router.post("/logout", logoutUserHandler);

router.post(
  "/forgot_password/:userType((trainer|customer))",
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

router.patch(
  "/reset_password/:userType((trainer|customer))/:resetToken",
  validate(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
