"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchMeSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
exports.patchMeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)().optional(),
        email: utils_1.emailValidations.optional(),
        whatsapp: (0, zod_1.string)({ required_error: "Whatsapp is required" })
            .optional()
            .refine((val) => {
            if (!val) {
                return true;
            }
            return (0, utils_1.isIndonesianPhoneNumber)(val);
        }),
    }),
});
