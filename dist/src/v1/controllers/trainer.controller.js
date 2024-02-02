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
exports.getTrainerHandler = void 0;
const genJson_1 = require("../utils/genJson");
const auth_schema_1 = require("../schemas/auth.schema");
const contract_service_1 = require("../services/contract.service");
const trainer_service_1 = require("../services/trainer.service");
const lodash_1 = require("lodash");
const getTrainerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const contracts = yield (0, contract_service_1.getActiveContracts)(user.id);
        if (contracts.length === 0) {
            return res.status(404).json((0, genJson_1.generateJson)({
                status: "fail",
                message: "Contract not found.",
            }));
        }
        const latestContract = contracts[0];
        const trainer = yield (0, trainer_service_1.getTrainerById)(latestContract.trainerId);
        if (!trainer) {
            return res.status(404).json((0, genJson_1.generateJson)({
                status: "fail",
                message: "Trainer not found.",
            }));
        }
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: (0, lodash_1.omit)(trainer, auth_schema_1.authResponseExcludedFields),
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.getTrainerHandler = getTrainerHandler;
