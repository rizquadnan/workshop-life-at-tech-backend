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
exports.getContractsHandler = exports.postContractHandler = void 0;
const customer_service_1 = require("../services/customer.service");
const genJson_1 = require("../utils/genJson");
const contract_service_1 = require("../services/contract.service");
const auth_trainer_service_1 = require("../services/auth.trainer.service");
const dayjs_1 = __importDefault(require("dayjs"));
const generateContractTime = (exerciseDurationDays) => {
    const now = (0, dayjs_1.default)();
    return {
        startTime: now.toDate(),
        endTime: now.add(exerciseDurationDays, "day").toDate(),
    };
};
const postContractHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainerId = res.locals.user.id;
        const trainer = yield (0, auth_trainer_service_1.findUniqueTrainerById)(trainerId);
        if (!trainer) {
            return res
                .status(404)
                .json((0, genJson_1.generateJson)({ status: "fail", message: "Trainer not found." }));
        }
        const customer = yield (0, customer_service_1.findUniqueCustomerById)(req.body.customerId);
        if (!customer) {
            return res
                .status(404)
                .json((0, genJson_1.generateJson)({ status: "fail", message: "Customer not found." }));
        }
        const existingContract = yield (0, contract_service_1.getContractsByTrainerCustomerId)(trainer.id, customer.id);
        if (existingContract.some((c) => c.contractStatus === "ACTIVE")) {
            return res.status(400).json((0, genJson_1.generateJson)({
                status: "fail",
                message: "Cannot create contract when still having active contract with customer.",
            }));
        }
        const { startTime, endTime } = generateContractTime(req.body.exerciseDurationDays);
        const result = yield (0, contract_service_1.createContract)({
            amount_of_exercise: req.body.numberOfExercise,
            customer: { connect: { id: customer.id } },
            endTime,
            startTime,
            trainer: { connect: { id: trainerId } },
        });
        return res
            .status(200)
            .json((0, genJson_1.generateJson)({ status: "success", data: result }));
    }
    catch (err) {
        next(err);
    }
});
exports.postContractHandler = postContractHandler;
const getContractsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainerId = req.query.trainerId
            ? Number(req.query.trainerId)
            : undefined;
        const customerId = req.query.customerId
            ? Number(req.query.customerId)
            : undefined;
        const contracts = yield (0, contract_service_1.getContractsByTrainerCustomerId)(trainerId, customerId);
        res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: contracts,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.getContractsHandler = getContractsHandler;
