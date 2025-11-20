// Importe le client Redis (utilisant ioredis comme exemple)
import Redis from "ioredis";
// Importe vos variables d'environnement
import { env } from "./index";
import { logger } from "../utils";

// Récupère les variables d'environnement
const { REDIS_HOST, REDIS_PORT } = env;

// Assurez-vous que les variables sont définies
if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error(
    "REDIS_HOST or REDIS_PORT environment variables are not set.",
  );
}

// 1. Configuration et Initialisation du client Redis
const redisClient = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
  // Ajoutez d'autres options si nécessaire (ex: mot de passe, TTL par défaut)
});

// 2. Gestion des événements (Logging)
redisClient.on("connect", () => {
  logger.info("✅ Connexion à Redis réussie.");
});

redisClient.on("error", (err) => {
  logger.error("❌ Erreur de connexion à Redis:", err);
  // En production, vous pourriez vouloir mettre fin à l'application ici
});

// 3. Exporte le client connecté pour qu'il puisse être utilisé partout
export default redisClient;
