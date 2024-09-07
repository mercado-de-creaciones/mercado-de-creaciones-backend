import { serial, varchar, boolean, pgTable, integer } from "drizzle-orm/pg-core";

import { categoriesTable } from "./categories.schema";

export const subcategoriesTable = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  active: boolean("active").default(true),
  categoryId: integer("categoryId").references(() => categoriesTable.id, { onDelete: "set null"}),
});

export type InsertSubCategory = typeof subcategoriesTable.$inferInsert;
export type SelectSubCategory = typeof subcategoriesTable.$inferSelect;
