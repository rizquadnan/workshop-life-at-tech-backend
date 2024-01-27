import { Router } from "express";
import { generateJson } from "../utils/genJson";
import {
  createExerciseHandler,
  getTrainerExercisesHandler,
  patchExerciseHandler,
} from "./exercise.controller";
import { validate } from "../middlewares/validate";
import {
  createExerciseSchema,
  getExerciseSchema,
  patchExerciseSchema,
} from "../schemas/exercise.schema";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, train

// TODO: role authorization
// TODO: tenant enforcement
router.post("/", validate(createExerciseSchema), createExerciseHandler);

// used in:
// - trainer app, train
// - customer app, dashboard
// - customer app, train

// TODO: role authorization
// TODO: filter by exercise status
router.get("/", validate(getExerciseSchema), getTrainerExercisesHandler);

// used in:
// - trainer app, train
// - customer app, train

// - patch exercise to the proper direction per user
router.patch(
  "/:exerciseId",
  validate(patchExerciseSchema),
  patchExerciseHandler
);

export default router;
0;
