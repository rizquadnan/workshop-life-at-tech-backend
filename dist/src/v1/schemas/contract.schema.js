"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractSchema = exports.postContractSchema = void 0;
const zod_1 = require("zod");
exports.postContractSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        exerciseDurationDays: (0, zod_1.number)({
            required_error: "Exercise duration is required.",
        }),
        customerId: (0, zod_1.number)({ required_error: "Customer is required." }),
        numberOfExercise: (0, zod_1.number)({
            required_error: "Number of exercise is required.",
        }),
    }),
});
exports.getContractSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        trainerId: (0, zod_1.string)().optional(),
        customerId: (0, zod_1.string)().optional(),
    }),
});
