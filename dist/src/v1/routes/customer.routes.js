"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deserializeUser_1 = require("../middlewares/deserializeUser");
const requireUser_1 = require("../middlewares/requireUser");
const customer_controller_1 = require("../controllers/customer.controller");
const router = (0, express_1.Router)();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// used in:
// - trainer app, train
// - trainer app, customer
router.get("/", customer_controller_1.getCustomersHandler);
exports.default = router;
