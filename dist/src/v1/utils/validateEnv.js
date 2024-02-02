"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        DATABASE_URL: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
        POSTGRES_HOST: (0, envalid_1.str)(),
        POSTGRES_PORT: (0, envalid_1.port)(),
        POSTGRES_USER: (0, envalid_1.str)(),
        POSTGRES_PASSWORD: (0, envalid_1.str)(),
        POSTGRES_DB: (0, envalid_1.str)(),
        JWT_ACCESS_TOKEN_PRIVATE_KEY: (0, envalid_1.str)(),
        JWT_ACCESS_TOKEN_PUBLIC_KEY: (0, envalid_1.str)(),
        JWT_REFRESH_TOKEN_PRIVATE_KEY: (0, envalid_1.str)(),
        JWT_REFRESH_TOKEN_PUBLIC_KEY: (0, envalid_1.str)(),
        EMAIL_USER: (0, envalid_1.str)(),
        EMAIL_PASS: (0, envalid_1.str)(),
        EMAIL_HOST: (0, envalid_1.str)(),
        EMAIL_PORT: (0, envalid_1.port)(),
    });
}
exports.default = validateEnv;
