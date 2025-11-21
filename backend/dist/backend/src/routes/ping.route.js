"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const pingRouter = (0, express_1.Router)();
pingRouter.get("/ping", controllers_1.pingController.ping);
exports.default = pingRouter;
