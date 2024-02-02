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
exports.updateCustomer = exports.findCustomerForPasswordReset = exports.findUniqueCustomerById = exports.findUniqueCustomerByEmail = exports.createCustomer = void 0;
const db_1 = __importDefault(require("../../db"));
const createCustomer = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.customer.create({
        data: input,
    }));
});
exports.createCustomer = createCustomer;
const findUniqueCustomerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.customer.findUnique({ where: { email } });
});
exports.findUniqueCustomerByEmail = findUniqueCustomerByEmail;
const findUniqueCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.customer.findUnique({ where: { id } });
});
exports.findUniqueCustomerById = findUniqueCustomerById;
const findCustomerForPasswordReset = (passwordResetToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.customer.findFirst({
        where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
    });
});
exports.findCustomerForPasswordReset = findCustomerForPasswordReset;
const updateCustomer = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.customer.update({ where, data, select }));
});
exports.updateCustomer = updateCustomer;
