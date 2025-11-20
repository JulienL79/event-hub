import { Pool } from "pg";
import { env } from "../src/config/env";
import { logger } from "../src/utils";

const pool = new Pool({ connectionString: env.DATABASE_URL });

async function main() {
  try {
    await pool.query(`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
			DROP SCHEMA drizzle CASCADE;
			CREATE SCHEMA drizzle;
		`);
    logger.info("✅ Toutes les tables et types ont été supprimés !");
  } catch (err) {
    logger.error("❌ Erreur lors du truncate :", err);
  } finally {
    await pool.end();
  }
}

main();
