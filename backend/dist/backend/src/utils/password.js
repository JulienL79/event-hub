"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const _1 = require("./");
//Hash d'un password
const hashPassword = async (password) => {
  try {
    const hash = await argon2_1.default.hash(password);
    return hash;
  } catch (err) {
    _1.logger.error("Erreur lors du hash du mot de passe: " + err.message);
    throw new Error("Erreur lors du hash du mot de passe");
  }
};
exports.hashPassword = hashPassword;
// Vérification mot de passe
const verifyPassword = async (password, hash) => {
  try {
    const verify = await argon2_1.default.verify(hash, password);
    return verify;
  } catch (err) {
    _1.logger.error(
      "Erreur lors de la vérification du mot de passe: " + err.message,
    );
    throw new Error("Erreur lors de la vérification du mot de passe");
  }
};
exports.verifyPassword = verifyPassword;
