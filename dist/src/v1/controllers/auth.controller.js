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
exports.changePasswordHandler = exports.resetPasswordHandler = exports.logoutUserHandler = exports.forgotPasswordHandler = exports.refreshAccessTokenHandler = exports.loginUserHandler = exports.registerUserHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const genJson_1 = require("../utils/genJson");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_trainer_service_1 = require("../services/auth.trainer.service");
const auth_customer_service_1 = require("../services/auth.customer.service");
const lodash_1 = require("lodash");
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("config"));
const email_1 = __importDefault(require("../utils/email"));
const cookiesOptions = {
    httpOnly: true,
    sameSite: "lax",
};
if (process.env.NODE_ENV === "production")
    cookiesOptions.secure = true;
const accessTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { maxAge: config_1.default.get("accessTokenExpiresIn") * 60 * 1000 });
const refreshTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { maxAge: config_1.default.get("refreshTokenExpiresIn") * 60 * 1000 });
const registerUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userType = req.params.userType;
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
        const payload = {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            rStatus: "ACTIVE",
            whatsapp: req.body.whatsapp,
        };
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.createTrainer)(payload)
            : (0, auth_customer_service_1.createCustomer)(payload));
        return res.status(201).json((0, genJson_1.generateJson)({
            status: "success",
            data: (0, lodash_1.omit)(user, auth_schema_1.authResponseExcludedFields),
        }));
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    status: "fail",
                    message: "Email already exist, please use another email address",
                });
            }
        }
        next(err);
    }
});
exports.registerUserHandler = registerUserHandler;
const loginUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userType = req.params.userType;
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.findUniqueTrainerByEmail)(email.toLowerCase())
            : (0, auth_customer_service_1.findUniqueCustomerByEmail)(email.toLowerCase()));
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return next(new appError_1.default(400, "Invalid email or password"));
        }
        const { access_token, refresh_token } = yield (0, jwt_1.signTokens)(user.id, userType);
        res.cookie("access_token", access_token, accessTokenCookieOptions);
        res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
        res.cookie("logged_in", true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: {
                user: (0, lodash_1.omit)(user, auth_schema_1.authResponseExcludedFields),
                token: access_token,
            },
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserHandler = loginUserHandler;
const refreshAccessTokenHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        const userType = req.params.userType;
        const message = "Could not refresh access token";
        if (!refresh_token) {
            return next(new appError_1.default(403, message));
        }
        // Validate refresh token
        const decoded = (0, jwt_1.verifyJwt)(refresh_token, "refreshTokenPublicKey");
        if (!decoded) {
            return next(new appError_1.default(403, message));
        }
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.findUniqueTrainerById)(decoded.sub)
            : (0, auth_customer_service_1.findUniqueCustomerById)(decoded.sub));
        if (!user) {
            return next(new appError_1.default(403, message));
        }
        // Sign new access token
        const access_token = (0, jwt_1.signJwt)({ sub: user.id }, "accessTokenPrivateKey", {
            expiresIn: `${config_1.default.get("accessTokenExpiresIn")}m`,
        });
        // 4. Add Cookies
        res.cookie("access_token", access_token, accessTokenCookieOptions);
        res.cookie("logged_in", true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        // 5. Send response
        res.status(200).json({
            status: "success",
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userType = req.params.userType;
        // Get the user from the collection
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.findUniqueTrainerByEmail)(req.body.email)
            : (0, auth_customer_service_1.findUniqueCustomerByEmail)(req.body.email));
        const message = "You will receive a reset email if user with that email exist";
        if (!user) {
            console.log("User not found.");
            return res.status(200).json({
                status: "success",
                message,
            });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const passwordResetToken = crypto_1.default
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        yield (userType === "trainer"
            ? (0, auth_trainer_service_1.updateTrainer)({ id: user.id }, {
                passwordResetToken,
                passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
            }, { email: true })
            : (0, auth_customer_service_1.updateCustomer)({ id: user.id }, {
                passwordResetToken,
                passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
            }, { email: true }));
        try {
            const url = `${config_1.default.get("origin")}/auth/v1/reset_password/${userType}/${resetToken}`;
            yield new email_1.default(user, url).sendPasswordResetToken();
            res.status(200).json({
                status: "success",
                message,
            });
        }
        catch (err) {
            userType === "trainer"
                ? yield (0, auth_trainer_service_1.updateTrainer)({ id: user.id }, { passwordResetToken: null, passwordResetAt: null }, {})
                : yield (0, auth_customer_service_1.updateCustomer)({ id: user.id }, { passwordResetToken: null, passwordResetAt: null }, {});
            return res.status(500).json({
                status: "error",
                message: "There was an error sending email",
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
function logout(res) {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.cookie("logged_in", "", { maxAge: 1 });
}
const logoutUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logout(res);
        res.status(200).json({
            status: "success",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUserHandler = logoutUserHandler;
const resetPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userType = req.params.userType;
        // Get the user from the collection
        const passwordResetToken = crypto_1.default
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.findTrainerForPasswordReset)(passwordResetToken)
            : (0, auth_customer_service_1.findCustomerForPasswordReset)(passwordResetToken));
        if (!user) {
            return res.status(403).json({
                status: "fail",
                message: "Invalid token or token has expired",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
        // Change password data
        yield (userType === "trainer"
            ? (0, auth_trainer_service_1.updateTrainer)({
                id: user.id,
            }, {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetAt: null,
            }, { email: true })
            : (0, auth_customer_service_1.updateCustomer)({
                id: user.id,
            }, {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetAt: null,
            }, { email: true }));
        logout(res);
        res.status(200).json({
            status: "success",
            message: "Password data updated successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const changePasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.id;
        const userType = res.locals.userType;
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
        // Change password data
        const user = yield (userType === "trainer"
            ? (0, auth_trainer_service_1.updateTrainer)({
                id: userId,
            }, {
                password: hashedPassword,
            })
            : (0, auth_customer_service_1.updateCustomer)({
                id: userId,
            }, {
                password: hashedPassword,
            }));
        return res.status(200).json((0, genJson_1.generateJson)({
            status: "success",
            data: (0, lodash_1.omit)(user, auth_schema_1.authResponseExcludedFields),
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.changePasswordHandler = changePasswordHandler;
