import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema";
import {
  changePasswordHandler,
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

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

router.patch(
  "/change_password",
  deserializeUser,
  requireUser,
  validate(changePasswordSchema),
  changePasswordHandler
);

export default router;
