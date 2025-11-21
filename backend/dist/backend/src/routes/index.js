"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_1 = __importDefault(require("./ping"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = (0, express_1.Router)();
router.use("/ping", ping_1.default);
router.use("/ping", auth_route_1.default);
exports.default = router;
