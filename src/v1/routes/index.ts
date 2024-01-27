import { Router } from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import contractRouter from "./contract.routes";
import customerRouter from "./customer.routes";
import exerciseRouter from "./exercise.routes";
import trainerRouter from "./trainer.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/contracts", contractRouter);
router.use("/customers", customerRouter);
router.use("/exercises", exerciseRouter);
router.use("/trainers", trainerRouter);

export default router;
