import { Pool } from "pg";
import { env } from "../src/config/env";
import fs from "fs";
import path from "path";

const pool = new Pool({ connectionString: env.DATABASE_URL });

async function main() {
  console.log(env.DATABASE_URL);
  try {
    await pool.query(`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
			DROP SCHEMA drizzle CASCADE;
			CREATE SCHEMA drizzle;
		`);
    console.log("✅ Toutes les tables et types ont été supprimés !");
  } catch (err) {
    console.error("❌ Erreur lors du truncate :", err);
  } finally {
    await pool.end();
  }
}

main();
