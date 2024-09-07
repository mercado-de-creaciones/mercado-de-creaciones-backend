import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const roleNamesEnum = pgEnum("name", ["ADMIN_ROLE", "USER_ROLE","VENDOR_ROLE"]);

export const rolesTable = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: roleNamesEnum("name").notNull().default("USER_ROLE"),
  description: varchar("description").notNull(),
});

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;