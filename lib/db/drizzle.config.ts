import { defineConfig } from "drizzle-kit";
import path from "path";

const drizzleDbUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;

if (!drizzleDbUrl) {
  throw new Error(
    "Set SUPABASE_DB_URL (recommended) or DATABASE_URL before running drizzle-kit.",
  );
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: drizzleDbUrl,
  },
});
