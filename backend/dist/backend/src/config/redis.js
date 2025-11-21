"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// Importe le client Redis (utilisant ioredis comme exemple)
const ioredis_1 = __importDefault(require("ioredis"));
// Importe vos variables d'environnement
const index_1 = require("./index");
const utils_1 = require("../utils");
// Récupère les variables d'environnement
const { REDIS_HOST, REDIS_PORT } = index_1.env;
// Assurez-vous que les variables sont définies
if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error(
    "REDIS_HOST or REDIS_PORT environment variables are not set.",
  );
}
// 1. Configuration et Initialisation du client Redis
const redisClient = new ioredis_1.default({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
  // Ajoutez d'autres options si nécessaire (ex: mot de passe, TTL par défaut)
});
// 2. Gestion des événements (Logging)
redisClient.on("connect", () => {
  utils_1.logger.info("✅ Connexion à Redis réussie.");
});
redisClient.on("error", (err) => {
  utils_1.logger.error("❌ Erreur de connexion à Redis:", err);
  // En production, vous pourriez vouloir mettre fin à l'application ici
});
// 3. Exporte le client connecté pour qu'il puisse être utilisé partout
exports.default = redisClient;
