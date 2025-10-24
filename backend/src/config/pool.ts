import { Pool } from "pg";
import { env } from "./env";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import * as schema from "../schemas";

const { DATABASE_URL } = env;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("✅ Connexion à PostgreSQL établie avec succès.");
  })
  .catch((error) => {
    console.error("❌ Échec de la connexion à PostgreSQL:", error.message);
  });

// la db qu'on exporte est une instance de NodePgDatabase, qui nous permettra de faire nos requetes DIRECTEMENT DESSUS
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
