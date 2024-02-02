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
exports.getCustomersHandler = void 0;
const customer_service_1 = require("../services/customer.service");
const genJson_1 = require("../utils/genJson");
const lodash_1 = require("lodash");
const filterExcludedCustomersFields = (customers) => {
    return customers.map((c) => (0, lodash_1.omit)(c, [
        "password",
        "passwordResetAt",
        "passwordResetToken",
        "rStatus",
    ]));
};
const getCustomersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield (0, customer_service_1.getCustomers)();
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: filterExcludedCustomersFields(customers),
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomersHandler = getCustomersHandler;
