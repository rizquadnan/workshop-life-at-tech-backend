import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { getCustomersHandler } from "../controllers/customer.controller";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, train
// - trainer app, customer
router.get("/", getCustomersHandler)

export default router;