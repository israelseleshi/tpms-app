import { Pool } from "pg";

// Use a single pool across serverless function invocations (Vercel edge / Node 20)
// The connection string should be stored in env var PG_URL or DATABASE_URL
// Example: postgres://user:password@host:5432/dbname

const connectionString = process.env.PG_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Database connection string (PG_URL or DATABASE_URL) is not set.");
}

// Vercel edge/serverless cold starts: reuse global pool if exists
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const globalForPg = global as unknown as { pgPool?: Pool };

export const pgPool: Pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

if (!globalForPg.pgPool) {
  globalForPg.pgPool = pgPool;
}
