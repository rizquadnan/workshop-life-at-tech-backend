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
exports.patchMeHandler = exports.getMeHandler = void 0;
const genJson_1 = require("../utils/genJson");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_trainer_service_1 = require("../services/auth.trainer.service");
const auth_customer_service_1 = require("../services/auth.customer.service");
const lodash_1 = require("lodash");
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: user,
        }));
    }
    catch (err) {
        next(err);
    }
});
exports.getMeHandler = getMeHandler;
const patchMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const userType = res.locals.user;
        const { email, name, whatsapp } = req.body;
        if (!email && !name && !whatsapp) {
            return res.status(400).json((0, genJson_1.generateJson)({
                status: "fail",
                message: "All fields are unchanged",
            }));
        }
        const modified = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.updateTrainer)({
                id: user.id,
            }, {
                email,
                name,
                whatsapp,
            })
            : (0, auth_customer_service_1.updateCustomer)({
                id: user.id,
            }, {
                email,
                name,
                whatsapp,
            }));
        res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: (0, lodash_1.omit)(modified, auth_schema_1.authResponseExcludedFields),
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.patchMeHandler = patchMeHandler;
