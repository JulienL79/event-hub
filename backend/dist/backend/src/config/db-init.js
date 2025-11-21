"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
const _1 = require("./");
const utils_1 = require("../utils");
async function initDatabase() {
  try {
    await _1.pool.query("SELECT 1");
    utils_1.logger.info("✅ Connexion à PostgreSQL établie avec succès.");
  } catch (error) {
    utils_1.logger.error(
      "❌ Échec de la connexion à PostgreSQL:",
      error.message,
    );
    process.exit(1);
  }
}
