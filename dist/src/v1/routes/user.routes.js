"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const validate_1 = require("../middlewares/validate");
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// used in:
// - trainer app, profile
// - customer app, profile
router.get("/me", user_controller_1.getMeHandler);
// used in:
// - trainer app, profile
// - customer app, profile
router.patch("/me", (0, validate_1.validate)(user_schema_1.patchMeSchema), user_controller_1.patchMeHandler);
exports.default = router;
