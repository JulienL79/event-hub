import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { env } from "./env";

const { DATABASE_URL } = env;

async function main() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    console.log("🌐 Connecting to database...");
    const db: NodePgDatabase = drizzle(pool);

    console.log("📦 Running migrations...");
    await migrate(db, { migrationsFolder: "src/migrations" });

    console.log("✅ Database migrated successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    // Toujours fermer le pool pour éviter les connexions pendantes
    await pool.end();
    console.log("🔌 Database connection closed.");
  }
}

main();
