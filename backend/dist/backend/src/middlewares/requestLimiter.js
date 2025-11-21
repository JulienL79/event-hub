"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLimiter = void 0;
const utils_1 = require("../utils");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const requestLimiter = (limit) => {
  const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: limit, // Utilisation du paramètre `limit`
    message: "Trop de tentatives de réinitialisation. Réessayez plus tard.",
    headers: true,
  });
  return async (request, response, next) => {
    utils_1.logger.info("[MIDDLEWARE] : requestLimiter");
    try {
      limiter(request, response, (err) => {
        if (err) {
          utils_1.logger.error("Limite de requêtes atteinte", err);
          return (0, utils_1.APIResponse)(
            response,
            null,
            "Trop de tentatives",
            429,
          );
        }
        next();
      });
    } catch (error) {
      utils_1.logger.error("Token invalide", error);
      return (0, utils_1.APIResponse)(response, null, "Token invalide", 401);
    }
  };
};
exports.requestLimiter = requestLimiter;
