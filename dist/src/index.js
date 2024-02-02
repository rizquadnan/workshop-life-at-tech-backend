"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config_1 = __importDefault(require("config"));
const validateEnv_1 = __importDefault(require("./v1/utils/validateEnv"));
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./db"));
(0, validateEnv_1.default)();
// NODE LEVEL ERROR HANDLER
process.on("uncaughtException", (err) => {
    console.log("[Node Global Error Handler] uncaughtException : ", err);
});
process.on("unhandledRejection", (err) => {
    console.log("[Node Global Error Handler] unhandledRejection: ", err);
});
const port = config_1.default.get("port");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        server_1.default.listen(port, () => {
            console.log(`Server on port: ${port}`);
        });
    });
}
bootstrap()
    .catch((err) => {
    throw err;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.$disconnect();
}));
