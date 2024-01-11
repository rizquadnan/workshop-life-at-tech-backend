import { Router } from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import contractRouter from "./contract.routes";
import customerRouter from "./customer.routes";
import exerciseRouter from "./exercise.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
// TODO: implement protected routes by authentication and authorization
router.use("/contracts", contractRouter);
router.use("/customers", customerRouter);
router.use("/exercises", exerciseRouter);

export default router;