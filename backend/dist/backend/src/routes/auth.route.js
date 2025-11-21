"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const authRouter = (0, express_1.Router)();
authRouter.post(
  "/login",
  (0, middlewares_1.isAuthenticated)(false),
  (0, middlewares_1.requestLimiter)(100),
  controllers_1.authController.login,
);
authRouter.post(
  "/register",
  (0, middlewares_1.isAuthenticated)(false),
  controllers_1.authController.register,
);
authRouter.get(
  "/logout",
  (0, middlewares_1.isAuthenticated)(true),
  controllers_1.authController.logout,
);
authRouter.get(
  "/me",
  (0, middlewares_1.isAuthenticated)(true),
  controllers_1.authController.checkConnexion,
);
exports.default = authRouter;
