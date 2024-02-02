"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const contract_schema_1 = require("../schemas/contract.schema");
const contract_controller_1 = require("../controllers/contract.controller");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const router = (0, express_1.Router)();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// used in:
// - trainer app, dashboard
// - customer app, dashboard
router.get("/", (0, validate_1.validate)(contract_schema_1.getContractSchema), contract_controller_1.getContractsHandler);
router.post("/", (0, validate_1.validate)(contract_schema_1.postContractSchema), contract_controller_1.postContractHandler);
exports.default = router;
