import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const permissionsTable = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
});

export type InsertPermission = typeof permissionsTable.$inferInsert;
export type SelectPermission = typeof permissionsTable.$inferSelect;

