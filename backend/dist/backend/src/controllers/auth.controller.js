"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const models_1 = require("../models");
const validators_1 = require("@eventhub/shared/validators");
const zod_1 = require("zod");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
const { JWT_SECRET, NODE_ENV } = env_1.env;
exports.authController = {
  login: async (request, response) => {
    try {
      utils_1.logger.info("[AUTH] Login");
      const { email, password } = request.body;
      const [user] = await models_1.userModel.findByCredentials(email);
      if (!user) {
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Les identifiants saisis sont incorrects",
          400,
        );
      }
      // vérification mot de passe hashé
      const validPassword = await (0, utils_1.verifyPassword)(
        password,
        user.password,
      );
      if (!validPassword) {
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Les identifiants saisis sont incorrects",
          400,
        );
      }
      // generation du jwt
      const accessToken = jsonwebtoken_1.default.sign(
        {
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          tempTokenId: user.tempTokenId,
        },
        JWT_SECRET,
        { expiresIn: "1h" },
      );
      response.cookie("accessToken", accessToken, {
        httpOnly: true, // true - cookie réservé uniquement pour communication HTTP - pas accessible en js
        sameSite: "none", // protection CSRF
        secure: NODE_ENV === "production", // le cookie ne sera envoyé que sur du HTTPS uniquement en prod
      });
      (0, utils_1.APIResponse)(response, null, "Vous êtes bien connecté", 200);
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la connexion de l'utilisateur:",
        error,
      );
      (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
    }
  },
  register: async (request, response) => {
    try {
      utils_1.logger.info("[AUTH] Register");
      const {
        firstname,
        lastname,
        birthdate,
        email,
        phoneNumber,
        password,
        createdAt,
        addressStreet,
        addressCity,
        addressZip,
        addressCountry,
        coordLat,
        coordLon,
        roleName,
      } = validators_1.userValidation.parse(request.body);
      // on vérifie qu'un user n'a pas déjà cet adresse email
      const [emailAlreadyExists] =
        await models_1.userModel.findByCredentials(email);
      if (emailAlreadyExists) {
        utils_1.logger.error("Cette adresse email est déjà utilisée");
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Cette adresse email est déjà utilisée",
          400,
        );
      }
      // on vérifie qu'un user n'a pas déjà ce numéro de téléphone
      const [phoneNumberAlreadyExists] =
        await models_1.userModel.findByPhoneNumber(phoneNumber);
      if (phoneNumberAlreadyExists) {
        utils_1.logger.error("Ce numéro de téléphone est déjà utilisé");
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Ce numéro de téléphone est déjà utilisé",
          400,
        );
      }
      // On hash le mot de passe en clair du formulaire
      const hash = await (0, utils_1.hashPassword)(password);
      if (!hash) {
        utils_1.logger.error("Un problème est survenu lors du hash");
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Un problème est survenu lors du hash",
          500,
        );
      }
      const [role] = await pool_1.db
        .select({ id: schemas_1.roles.id })
        .from(schemas_1.roles)
        .where((0, drizzle_orm_1.eq)(schemas_1.roles.name, roleName));
      // On ajoute le new user dans la db avec le mdp hashé
      const [newUser] = await models_1.userModel.create({
        roleId: role.id,
        firstname,
        lastname,
        birthdate,
        email,
        phoneNumber,
        password: hash,
        createdAt,
        addressStreet,
        addressCity,
        addressZip,
        addressCountry,
        coordLat,
        coordLon,
      });
      if (!newUser) {
        utils_1.logger.error("Un problème est survenu lors de la création");
        return (0, utils_1.APIResponse)(
          response,
          null,
          "Un problème est survenu lors de la création",
          500,
        );
      }
      (0, utils_1.APIResponse)(response, newUser.id, "Vous êtes inscrit", 200);
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de l'inscription de l'utilisateur:",
        error,
      );
      if (error instanceof zod_1.z.ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        return (0, utils_1.APIResponse)(
          response,
          formattedErrors,
          "Le formulaire est invalide",
          400,
        );
      }
      (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
    }
  },
  logout: async (request, response) => {
    utils_1.logger.info("[AUTH] Logout");
    response.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: NODE_ENV === "production",
    });
    (0, utils_1.APIResponse)(response, null, "Vous êtes déconnecté", 200);
  },
  checkConnexion: async (request, response) => {
    utils_1.logger.info("[AUTH] Me");
    const { user } = response.locals;
    const userData = await models_1.userModel.get(user.id);
    if (!userData) {
      return (0, utils_1.APIResponse)(
        response,
        null,
        "Utilisateur non trouvé",
        404,
      );
    }
    const [role] = await models_1.userModel.getRoleByUser(user.id);
    (0, utils_1.APIResponse)(
      response,
      {
        id: user.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: role.role?.name ?? "user",
      },
      "Vous êtes bien connectée",
      200,
    );
  },
};
