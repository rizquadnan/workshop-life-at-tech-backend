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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchExercise = exports.getExercisesForCustomer = exports.getExercisesForTrainer = exports.createExercise = void 0;
const db_1 = __importDefault(require("../../db"));
const createExercise = (exercise) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.exercises.create({ data: exercise });
});
exports.createExercise = createExercise;
const getExercisesForTrainer = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.$queryRaw `
    SELECT "Exercises".id,
      "Exercises"."exerciseStatus", 
      "Contract"."trainerId",
      "Contract"."customerId",
      "Contract"."startTime" AS "exerciseStart",
      "Customer".name AS "customerName"
    FROM "Exercises"
    INNER JOIN "Contract" ON "Exercises"."contractId"="Contract".id
    INNER JOIN "Customer" ON "Contract"."customerId"="Customer".id
    WHERE "Contract"."trainerId"=${args.trainerId};`);
});
exports.getExercisesForTrainer = getExercisesForTrainer;
const getExercisesForCustomer = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.$queryRaw `
    SELECT "Exercises".id,
      "Exercises"."exerciseStatus", 
      "Contract"."trainerId",
      "Contract"."customerId",
      "Contract"."startTime" AS "exerciseStart",
      "Trainer".name AS "trainerName"
    FROM "Exercises"
    INNER JOIN "Contract" ON "Exercises"."contractId"="Contract".id
    INNER JOIN "Trainer" ON "Contract"."trainerId"="Trainer".id
    WHERE "Contract"."customerId"=${args.customerId};`);
});
exports.getExercisesForCustomer = getExercisesForCustomer;
const patchExercise = (exerciseId, exerciseStatus) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.exercises.update({
        where: { id: exerciseId },
        data: { exerciseStatus },
    });
});
exports.patchExercise = patchExercise;
