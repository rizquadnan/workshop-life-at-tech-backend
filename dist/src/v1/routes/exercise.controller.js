"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchExerciseHandler = exports.getTrainerExercisesHandler = exports.createExerciseHandler = void 0;
const genJson_1 = require("../utils/genJson");
const exercise_service_1 = require("../services/exercise.service");
const contract_service_1 = require("../services/contract.service");
const createExerciseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield (0, contract_service_1.getContractById)(req.body.contractId);
        if (!contract) {
            return res
                .status(404)
                .json((0, genJson_1.generateJson)({ status: "fail", message: "Contract not found." }));
        }
        const exercise = yield (0, exercise_service_1.createExercise)({
            contract: { connect: { id: req.body.contractId } },
            startTime: new Date(),
            exerciseStatus: "ACTIVE",
        });
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: exercise,
        }));
    }
    catch (err) {
        next(err);
    }
});
exports.createExerciseHandler = createExerciseHandler;
const getTrainerExercisesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const userType = res.locals.userType;
        const exercises = yield (userType === "trainer"
            ? (0, exercise_service_1.getExercisesForTrainer)({
                trainerId: user.id,
            })
            : (0, exercise_service_1.getExercisesForCustomer)({ customerId: user.id }));
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: exercises,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.getTrainerExercisesHandler = getTrainerExercisesHandler;
const patchExerciseHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const userType = res.locals.userType;
        const exerciseId = req.params.exerciseId;
        const result = yield (0, exercise_service_1.patchExercise)(Number(exerciseId), userType === "trainer" ? "PENDING" : "FINISHED");
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: result,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.patchExerciseHandler = patchExerciseHandler;
