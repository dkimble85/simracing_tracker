import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";

import { env } from "../env.mjs";
import * as schema from "./db/schema";

const globalForDb = globalThis as unknown as {
  db: PostgresJsDatabase<typeof schema> | undefined;
  sql: Sql | undefined;
};

const sql =
  globalForDb.sql ??
  postgres(env.DATABASE_URL, {
    prepare: false,
  });

export const db =
  globalForDb.db ??
  drizzle(sql, {
    schema,
    logger: env.NODE_ENV === "development",
  });

if (env.NODE_ENV !== "production") {
  globalForDb.db = db;
  globalForDb.sql = sql;
}
