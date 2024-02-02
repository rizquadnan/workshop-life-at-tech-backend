"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidations = exports.passwordValidations = exports.isIndonesianPhoneNumber = void 0;
const zod_1 = require("zod");
const isIndonesianPhoneNumber = (input) => {
    const regex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
    return regex.test(input);
};
exports.isIndonesianPhoneNumber = isIndonesianPhoneNumber;
exports.passwordValidations = (0, zod_1.string)({
    required_error: "Password is required",
})
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters");
exports.emailValidations = (0, zod_1.string)({
    required_error: "Email address is required",
}).email("Invalid email address");
