"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserSchema = exports.authResponseExcludedFields = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        email: utils_1.emailValidations,
        password: utils_1.passwordValidations,
        passwordConfirm: (0, zod_1.string)({
            required_error: "Please confirm your password",
        }),
        whatsapp: (0, zod_1.string)({ required_error: "Whatsapp is required" }).refine(utils_1.isIndonesianPhoneNumber),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords do not match",
    }),
});
exports.authResponseExcludedFields = [
    "password",
    "passwordResetToken",
    "passwordResetAt",
    "rStatus",
];
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: utils_1.emailValidations,
        password: utils_1.passwordValidations,
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Email is invalid"),
    }),
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        resetToken: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(8, "Password must be more than 8 characters"),
        passwordConfirm: (0, zod_1.string)({
            required_error: "Please confirm your password",
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }),
});
exports.changePasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(8, "Password must be more than 8 characters"),
        passwordConfirm: (0, zod_1.string)({
            required_error: "Please confirm your password",
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }),
});
