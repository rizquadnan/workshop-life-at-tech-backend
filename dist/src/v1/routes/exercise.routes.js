"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_controller_1 = require("./exercise.controller");
const validate_1 = require("../middlewares/validate");
const exercise_schema_1 = require("../schemas/exercise.schema");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const router = (0, express_1.Router)();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// used in:
// - trainer app, train
router.post("/", (0, validate_1.validate)(exercise_schema_1.createExerciseSchema), exercise_controller_1.createExerciseHandler);
// used in:
// - trainer app, train
// - customer app, dashboard
// - customer app, train
router.get("/", (0, validate_1.validate)(exercise_schema_1.getExerciseSchema), exercise_controller_1.getTrainerExercisesHandler);
// used in:
// - trainer app, train
// - customer app, train
router.patch("/:exerciseId", (0, validate_1.validate)(exercise_schema_1.patchExerciseSchema), exercise_controller_1.patchExerciseHandler);
exports.default = router;
0;
