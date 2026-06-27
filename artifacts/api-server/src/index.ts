import dotenv from "dotenv";
import path from "node:path";
import app from "./app";
import { logger } from "./lib/logger";
import { assertSupabaseEnv } from "@workspace/db";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
});

const rawPort = process.env["PORT"] ?? "8787";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

try {
  assertSupabaseEnv();
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
} catch (err) {
  logger.error({ err }, "Failed to start API server");
  process.exit(1);
}
