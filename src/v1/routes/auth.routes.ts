import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from "../schemas/user.schema";
import {
  forgotPasswordHandler,
  loginUserHandler,
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

router.post("/logout", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "logout in development",
    })
  );
});

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
