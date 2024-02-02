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
exports.deserializeUser = void 0;
const lodash_1 = require("lodash");
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_trainer_service_1 = require("../services/auth.trainer.service");
const auth_customer_service_1 = require("../services/auth.customer.service");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            access_token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, "You are not logged in"));
        }
        // Validate the access token
        const decoded = (0, jwt_1.verifyJwt)(access_token, "accessTokenPublicKey");
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        // Check if the user still exist
        const user = yield (decoded.userType === "trainer"
            ? (0, auth_trainer_service_1.findUniqueTrainerById)(decoded.sub)
            : (0, auth_customer_service_1.findUniqueCustomerById)(decoded.sub));
        if (!user) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        // Add user to res.locals
        res.locals.user = (0, lodash_1.omit)(user, auth_schema_1.authResponseExcludedFields);
        res.locals.userType = decoded.userType;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
