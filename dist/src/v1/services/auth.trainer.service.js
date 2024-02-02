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
exports.updateTrainer = exports.findTrainerForPasswordReset = exports.findUniqueTrainerById = exports.findUniqueTrainerByEmail = exports.createTrainer = void 0;
const db_1 = __importDefault(require("../../db"));
const createTrainer = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.trainer.create({
        data: input,
    });
});
exports.createTrainer = createTrainer;
const findUniqueTrainerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.trainer.findUnique({ where: { email } });
});
exports.findUniqueTrainerByEmail = findUniqueTrainerByEmail;
const findUniqueTrainerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.trainer.findUnique({ where: { id } });
});
exports.findUniqueTrainerById = findUniqueTrainerById;
const findTrainerForPasswordReset = (passwordResetToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.trainer.findFirst({
        where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
    });
});
exports.findTrainerForPasswordReset = findTrainerForPasswordReset;
const updateTrainer = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.trainer.update({ where, data, select });
});
exports.updateTrainer = updateTrainer;
