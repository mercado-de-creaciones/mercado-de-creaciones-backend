import { serial, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema";

export const salesTable = pgTable("sales", {
  id: serial("id").primaryKey(),
  total: integer("total").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: integer("userId").references(() => usersTable.id, { onDelete: "set null" }),
});

export type InsertSale = typeof salesTable.$inferInsert;
export type SelectSale = typeof salesTable.$inferSelect;

