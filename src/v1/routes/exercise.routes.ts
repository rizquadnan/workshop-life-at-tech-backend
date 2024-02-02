import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { validate } from "../middlewares/validate";
import {
  getExerciseSchema,
  patchExerciseSchema,
} from "../schemas/exercise.schema";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, train
// WORKSHOP-HINT: add post exercise route here

export default router;
