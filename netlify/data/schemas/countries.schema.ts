import { serial, varchar, pgTable, char } from "drizzle-orm/pg-core";

export const countriesTable = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  domain: char("domain", { length: 2 }).notNull(),
});

export type InsertCountry = typeof countriesTable.$inferInsert;
export type SelectCountry = typeof countriesTable.$inferSelect;
