"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const env_1 = require("./env");
const utils_1 = require("../utils");
const { DATABASE_URL } = env_1.env;
async function main() {
  const pool = new pg_1.Pool({ connectionString: DATABASE_URL });
  try {
    utils_1.logger.info("🌐 Connecting to database...");
    const db = (0, node_postgres_1.drizzle)(pool);
    utils_1.logger.info("📦 Running migrations...");
    await (0, migrator_1.migrate)(db, { migrationsFolder: "src/migrations" });
    utils_1.logger.info("✅ Database migrated successfully!");
  } catch (err) {
    utils_1.logger.error("❌ Migration failed:", err);
  } finally {
    // Toujours fermer le pool pour éviter les connexions pendantes
    await pool.end();
    utils_1.logger.info("🔌 Database connection closed.");
  }
}
main();
