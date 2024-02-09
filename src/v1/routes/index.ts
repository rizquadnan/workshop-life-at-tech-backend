import { Router } from "express";

import authRouter from "./auth.routes";
import contractRouter from "./contract.routes";
import exerciseRouter from "./exercise.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/contracts", contractRouter);
router.use("/exercises", exerciseRouter);

export default router;
