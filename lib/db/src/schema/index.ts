import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioStateTable = pgTable("portfolio_state", {
  key: text("key").primaryKey(),
  draft: jsonb("draft").notNull(),
  published: jsonb("published").notNull(),
  analytics: jsonb("analytics").notNull().default({ views: 0, projectClicks: 0 }),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPortfolioStateSchema = createInsertSchema(portfolioStateTable).omit({ key: true });
export type InsertPortfolioState = z.infer<typeof insertPortfolioStateSchema>;
export type PortfolioState = typeof portfolioStateTable.$inferSelect;