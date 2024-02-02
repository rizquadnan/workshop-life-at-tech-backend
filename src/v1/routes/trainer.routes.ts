import { Router } from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { getTrainerHandler } from "../controllers/trainer.controller";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - customer app, dashboard
router.get("/", getTrainerHandler);

export default router;
