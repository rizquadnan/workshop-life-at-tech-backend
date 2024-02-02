"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("config"));
const appError_1 = __importDefault(require("./v1/utils/appError"));
const routes_1 = __importDefault(require("./v1/routes"));
const app = (0, express_1.default)();
// MIDDLEWARE
// 1.Body Parser
app.use(express_1.default.json({ limit: "10kb" }));
// 2. Cookie Parser
app.use((0, cookie_parser_1.default)());
// 3. Cors
app.use((0, cors_1.default)({
    origin: [config_1.default.get("frontendUrl")],
    credentials: true,
}));
// 4 Logger
if (config_1.default.get("nodeEnv") === "development")
    app.use((0, morgan_1.default)("dev"));
// ROUTES
app.use("/api/v1", routes_1.default);
// HEALTH CHECK
app.get("/api/v1/health_check", (_, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Baret PT API",
    });
});
// UNHANDLED ROUTES
app.all("*", (req, res, next) => {
    next(new appError_1.default(404, `Route ${req.originalUrl} not found`));
});
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    console.error(err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
app.get("/", (req, res) => {
    res.json("Welcome to Baret PT API");
});
exports.default = app;
