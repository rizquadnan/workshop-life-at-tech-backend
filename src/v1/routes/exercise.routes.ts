import { Router } from "express";
import { generateJson } from "../utils/genJson";
import {
  createExerciseHandler,
  getTrainerExercisesHandler,
} from "./exercise.controller";
import { validate } from "../middlewares/validate";
import {
  createExerciseSchema,
  getExerciseSchema,
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
router.patch("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "patch exercise in development",
    })
  );
});

export default router;
0;
