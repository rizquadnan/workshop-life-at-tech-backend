import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { getMeHandler, patchMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { validate } from "../middlewares/validate";
import { patchMeSchema } from "../schemas/user.schema";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, profile
// - customer app, profile
router.get("/me", getMeHandler);

// used in:
// - trainer app, profile
// - customer app, profile

// TODO: add special endpoint for changing email
router.patch("/me", validate(patchMeSchema), patchMeHandler);

export default router;
