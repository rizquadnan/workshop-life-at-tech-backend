"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchExerciseSchema = exports.getExerciseSchema = exports.createExerciseSchema = void 0;
const zod_1 = __importStar(require("zod"));
exports.createExerciseSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        contractId: (0, zod_1.number)({ required_error: "Contract is required." }),
    }),
});
exports.getExerciseSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        trainerId: (0, zod_1.string)()
            .optional()
            .refine((val) => typeof val === "string" ? isNaN(Number(val)) === false : true, { message: "trainerId param must be a number." }),
        customerId: (0, zod_1.string)()
            .optional()
            .refine((val) => typeof val === "string" ? isNaN(Number(val)) === false : true, { message: "customerId param must be a number." }),
        exerciseStatus: zod_1.default.enum(["ACTIVE", "PENDING", "FINISHED"]).optional(),
    }),
});
exports.patchExerciseSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        exerciseId: (0, zod_1.string)().refine((val) => (typeof val === "string" ? isNaN(Number(val)) === false : true), { message: "exerciseId param must be a number." }),
    }),
});
