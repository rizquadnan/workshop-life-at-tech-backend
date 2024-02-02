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
exports.getActiveContracts = exports.getContractsByTrainerCustomerId = exports.getContractById = exports.createContract = void 0;
const db_1 = __importDefault(require("../../db"));
const createContract = (contract) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.contract.create({ data: contract });
});
exports.createContract = createContract;
const getContractById = (contractId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.contract.findUnique({ where: { id: contractId } });
});
exports.getContractById = getContractById;
const getContractsByTrainerCustomerId = (trainerId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.contract.findMany({ where: { trainerId, customerId } });
});
exports.getContractsByTrainerCustomerId = getContractsByTrainerCustomerId;
const getActiveContracts = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.contract.findMany({
        where: { customerId, contractStatus: "ACTIVE" },
    });
});
exports.getActiveContracts = getActiveContracts;
