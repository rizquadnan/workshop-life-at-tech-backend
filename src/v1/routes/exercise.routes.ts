import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { createExerciseHandler } from "./exercise.controller";
import { validate } from "../middlewares/validate";
import { createExerciseSchema } from "../schemas/exercise.schema";

const router = Router();

// used in:
// - trainer app, train

// - validate schema
// - create exercise
// TODO: role authorization
router.post("/", validate(createExerciseSchema), createExerciseHandler);

// used in:
// - trainer app, train
// - customer app, dashboard
// - customer app, train
router.get("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "get exercise in development",
    })
  );
});

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
