import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import {
  getContractSchema,
  postContractSchema,
} from "../schemas/contract.schema";
import {
  getContractsHandler,
  postContractHandler,
} from "../controllers/contract.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, dashboard
// - customer app, dashboard

router.get("/", validate(getContractSchema), getContractsHandler);

router.post("/", validate(postContractSchema), postContractHandler);

export default router;
