import { Pool } from "pg";

// Lazy-create pool only when accessed at runtime to avoid requiring PG_URL during static build
let cachedPool: Pool | null = null;

export function getPgPool(): Pool {
  if (cachedPool) return cachedPool;

  const connectionString = process.env.PG_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Database connection string (PG_URL or DATABASE_URL) is not set.");
  }

  // Re-use across hot reloads / serverless invocations
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const globalForPg = global as unknown as { pgPool?: Pool };

  cachedPool =
    globalForPg.pgPool ||
    new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

  if (!globalForPg.pgPool) {
    globalForPg.pgPool = cachedPool;
  }

  return cachedPool;
}
