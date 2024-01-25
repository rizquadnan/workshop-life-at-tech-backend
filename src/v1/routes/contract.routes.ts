import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import { postContractSchema } from "../schemas/contract.schema";
import { postContractHandler } from "../controllers/contract.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, dashboard
// - customer app, dashboard 
router.get("/", (req, res) => {
  res.status(200).json(generateJson({
    status: "success",
    message: "get contracts still in development"
  }))
})

router.post("/", validate(postContractSchema), postContractHandler)

export default router;