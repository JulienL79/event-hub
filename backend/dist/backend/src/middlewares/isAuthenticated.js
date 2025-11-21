"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const models_1 = require("../models");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
const utils_1 = require("../utils");
const { JWT_SECRET } = env_1.env;
const isAuthenticated = (isExpected) => {
  return async (request, response, next) => {
    utils_1.logger.info("[MIDDLEWARE] : isAuthenticated");
    const { accessToken } = request.cookies; // on récupére le cookie "accessToken" qui contient le JWT
    if (!accessToken) {
      // Si nous avons besoin de ne pas être identifié (ex: login, register,..)
      if (!isExpected) {
        return next();
      }
      // Sinon
      return (0, response_1.APIResponse)(
        response,
        null,
        "Vous devez être connecté",
        401,
      );
    } else {
      // Si nous avons besoin de ne pas être identifié (ex: login, register,..)
      if (!isExpected) {
        utils_1.logger.error("Vous devez être déconnecté");
        return (0, response_1.APIResponse)(
          response,
          null,
          "Vous devez être déconnecté",
          401,
        );
      }
      // Sinon
      try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        // en dessous, c'est que verify est bien passé correctement !
        response.locals.user = decoded;
        // On récupère le rôle du user pour l'intégrer en response.locals
        const [role] = await models_1.userModel.getRoleByUser(
          response.locals.user.id,
        );
        // On récupère le token temporaire en BDD pour vérifier s'il est cohérent avec celui du token actuel
        const [tempTokenDb] = await pool_1.db
          .select({ id: schemas_1.users.tempTokenId })
          .from(schemas_1.users)
          .where(
            (0, drizzle_orm_1.eq)(schemas_1.users.id, response.locals.user.id),
          );
        const isSameToken =
          tempTokenDb?.id === response.locals.user.tempTokenId;
        // Il y a eu changement du token temp (changement mdp) ou le user a été supprimé -> Déconnexion
        if (!role || !tempTokenDb || !isSameToken) {
          response.clearCookie("accessToken");
          utils_1.logger.error("Token invalide");
          return (0, response_1.APIResponse)(
            response,
            null,
            "Votre session a expiré, veuillez vous reconnecter",
            401,
          );
        }
        response.locals.user.isAdmin = role.role?.name === "admin";
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          response.clearCookie("accessToken");
          utils_1.logger.error("Votre session a expiré");
          return (0, response_1.APIResponse)(
            response,
            null,
            "Votre session a expiré, veuillez vous reconnecter",
            401,
          );
        }
        utils_1.logger.error("Token invalide", error);
        return (0, response_1.APIResponse)(
          response,
          null,
          "Token invalide",
          401,
        );
      }
    }
  };
};
exports.isAuthenticated = isAuthenticated;
